import {db} from "../services/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
import {nanoid} from "nanoid";
import {nodemail} from "../services/sendEmail.js";



const mailMaker = (email, code) => {
  return (
    {
      from: `SocialWeb`,// 发件人
      subject: 'Welcome To SocialWeb!',//邮箱主题
      to: email,//收件人，这里由post请求传递过来
      // 邮件内容，用html格式编写
      html: `
             <h1>Thanks for signing up for SocialWeb! </h1>
             <p>Here's your verification code 
                <i style="color:rgb(215,43,50);">( Valid time: 1 hour )</i>:
                <strong style="color:rgb(19,75,71);">${code}</strong>
             </p>
             <p>Let's get your email address verified!</p>
             <p><a href="http://localhost:8088/">SocialWeb.com</a></p>
         `
    })
}

// /:email
export const resendCode = (req, res) => {
  const email = req.params.email;

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    // error
    if (err) return res.status(500).json(err);
    //not founded
    if (!data.length) return res.status(404).json("User not found");

    //  if not exist, create a new user
    //  Step1: send email with verify code
    const code = nanoid(6).toUpperCase()

    const mail = mailMaker(email, code);
    nodemail.sendMail(mail, (err, info) => {
      if (err) return res.status(500).json(err);
    });

    const q = "UPDATE users SET `status`=?,`verifyCode`=? WHERE id=?";
    const values = [
      "unverified",
      moment(Date.now()) + code,
      data[0].id
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Sent and updated!");
    })
  })
}

// {email,code} => jwt tempAccessToken
export const verifiedCode = (req, res) => {
  const {email, code} = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("User not found");

    //  check invalid or not
    const vc = data[0].verifyCode;
    //check code
    const verifyCode = vc.slice(vc.length - 6);

    //check date
    const date = vc.slice(0, vc.length - 6);
    const overdue = !(moment(Date.now()).isBefore(parseInt(date) + (1000 * 60 * 60)));

    if (code !== verifyCode || overdue) return res.status(400).json("Invalid code");

    //  update user status and verify code
    const q = "UPDATE users SET `status`=?,`verifyCode`=? WHERE id=?";
    const values = ["verified", "", data[0].id];

    const token = jwt.sign({id: data[0].id}, "tempKey");
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.cookie("tempAccessToken", token, {httpOnly: true,})
          .status(200)
          .json("Finished verification!");
      }
    })
  })
}

// changePassword
export const changePassword = (req, res) => {
  const {password} = req.body;

  const token = req.cookies.tempAccessToken;
  if (!token) return res.status(401).json("You don't have the access to do that)");

  jwt.verify(token, "tempKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "UPDATE users SET `password`=? WHERE id=?";
    const values = [hashedPassword, userInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.clearCookie("tempAccessToken",
          {
            secure: true,
            sameSite: "none",//如果端口不一樣，默認會禁止清理cookie
          })
          .status(200)
          .json("Change password successfully!");
      }
    })
  })
}

//give: {email,password}
export const register = (req, res) => {
  const {email, password} = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    // error
    if (err) return res.status(500).json(err);

    //  check if user already exist
    if (data.length) return res.status(400).json("User already exists")

    //  if not exist, create a new user
    //  Step1: send email with verify code
    const code = nanoid(6).toUpperCase()
    const mail = mailMaker(email, code);
    nodemail.sendMail(mail, (err, info) => {
      if (err) return res.status(500).json(err);
      //  Step2: create user
      //hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      //create user
      const values = [
        email,
        hashedPassword,
        "unverified",//status
        moment(Date.now()) + code,//verifyCod
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      ];
      const q = "INSERT INTO users (`email`,`password`,`status`,`verifyCode`,`createdAt`) VALUE (?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        //create profile
        const q = "INSERT INTO profiles (`userId`,`name`,`profilePic`,`lastEdited`) VALUE (?)";
        const name = email.slice(0, email.indexOf("@"));
        const values = [data.insertId, name, "", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been created");
        })
      })
    });
  })
};

//give: {email,password}
export const login = (req, res) => {
  const q = `SELECT u.*, p.name, p.profilePic
             FROM users AS u
                      Left Join profiles AS p
                                ON (u.id = p.userId)
             WHERE u.email = ?`;
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (!data.length) return res.status(404).json("User not found");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username");
    const token = jwt.sign({id: data[0].id}, "secretKey");

    //separate password from user info
    const {password,verifyCode,status, ...others} = data[0]

    //return
    return res.cookie("accessToken", token,
      {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  })

};

export const logout = (req, res) => {
  return res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",//如果端口不一樣，默認會禁止清理cookie
  })
    .status(200)
    .json("User has been logout");
//  client side 可以check cookie 在不在去判定login/logout
};