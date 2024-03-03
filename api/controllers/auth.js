import {db} from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
import nodemailer from "nodemailer";
import {nanoid} from "nanoid";


//for sending email
const nodemail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dc.agneschang@gmail.com",
    pass: "rpuilhikyisdsoxo"
  }
})
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

// email,code
export const verifiedCode = (req, res) => {

}

//give: {email,password,code}
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
    nodemail.sendMail(mail, (err,info) => {
      if (err) return res.status(500).json(err);
    });

    //  Step2: create user
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const name = email.slice(0, email.indexOf("@"));

    const values = [
      email,
      hashedPassword,
      name,
      "",//profilePic
      "unverified",//status
      moment(Date.now())+code,//verifyCod
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];
    const q = "INSERT INTO users (`email`,`password`,`name`,`profilePic`,`status`,`verifyCode`,`createdAt`) VALUE (?)";

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    })
  })

};

//give: {email,password}
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (!data.length) return res.status(404).json("User not found");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) return res.status(400).json("Wrong password or username");
    const token = jwt.sign({id: data[0].id}, "secretKey");

    //separate password from user info
    const {password, ...others} = data[0]

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
  return res.clearCookie({
    secure: true,
    sameSite: "none",//如果端口不一樣，默認會禁止清理cookie
  })
    .status(200)
    .json("User has been logout");
//  client side 可以check cookie 在不在去判定login/logout
};