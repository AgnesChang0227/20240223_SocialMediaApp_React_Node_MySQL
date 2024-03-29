import {db} from "../services/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req, res) => {
  const q = `
      SELECT c.*, name, profilePic
      FROM comments AS c
               JOIN profiles AS p
                    ON (p.userId = c.userId)
      WHERE c.postId = ?
      ORDER BY c.createdAt DESC
  `

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(data);
    return res.status(200).json(data);
  })
}

export const addComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)";
    const values=[
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ]

    db.query(q,[values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    })
  })
}