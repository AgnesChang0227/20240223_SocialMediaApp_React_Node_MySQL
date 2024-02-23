import {db} from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = (req, res) => {
//  check user if exist
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    //get user data => username should be unique
    if (data.length) return res.status(400).json("User already exists")
    //  create a new user
    //    hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);


    const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name
    ];
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
    const token = jwt.sign({id: data[0].id}, "secretkey");

    //separate password from user info
    const {password, ...others} = data[0]

    //return
    res.cookie("accessToken", token,
      {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  })

};

export const logout = (req, res) => {
  res.clearCookie({
    secure:true,
    sameSite:"none",//如果端口不一樣，默認會禁止清理cookie
  })
    .status(200)
    .json("User has been logout");
//  client side 可以check cookie 在不在去判定login/logout
};