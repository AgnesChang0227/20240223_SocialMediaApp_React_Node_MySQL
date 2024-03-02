import {db} from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";

//give: {email,password,name,profilePic}
export const register = (req, res) => {
//  check user if exist
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    //  check if user already exist
    if (data.length) return res.status(400).json("User already exists")

    //  create a new user
    //  Step1: hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Step2: save into DB
    const values = [
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.profilePic,
      "unverified",
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];
    const q = "INSERT INTO users (`email`,`password`,`name`,`profilePic`,`status`,`createdAt`) VALUE (?)";

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    })
  })

};

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
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
    secure:true,
    sameSite:"none",//如果端口不一樣，默認會禁止清理cookie
  })
    .status(200)
    .json("User has been logout");
//  client side 可以check cookie 在不在去判定login/logout
};