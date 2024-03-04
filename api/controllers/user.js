import {db} from "../services/connect.js";
import jwt from "jsonwebtoken";


export const getUser = (req, res) => {
  const {userId} = req.params;
  const q = "SELECT * FROM profiles WHERE userId = ?"

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).join(err);
    //separate the password
    const {password, ...info} = data[0];
    return res.json(info);
  })
}
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = 'UPDATE profiles SET `name`=?,`desc`=?,`city`=?,`website`=?,`coverPic`=?,`profilePic`=? WHERE userId=?'
    const values = [
      req.body.name,
      req.body.desc,
      req.body.city,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      userInfo.id
    ]

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows>0) return res.json("Updated");
      return res.status(403).json("You can only update your profile")
    })
  })

}