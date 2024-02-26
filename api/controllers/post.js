import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //JOIN = INNER JOIN => p和u有交集的部分
    //LEFT JOIN = 要p的全部 + 如果user=被followed的部分
    //WHERE OR ：作為follower 或者作為post的owner

    const userId = req.query.userId;
    const q =( userId&&userId!=="undefined")
      ////all target user 的post
      ? `SELECT p.*, u.id AS userId, name, profilePic
         FROM posts AS p
                  JOIN users AS u
                       ON (u.id = p.userId)
         WHERE p.userId = ?
         ORDER BY p.createdAt DESC`
      //自己的post+followed的post
      : `SELECT p.*, u.id AS userId, name, profilePic
         FROM posts AS p
                  JOIN users AS u
                       ON (u.id = p.userId)
                  LEFT JOIN relationships AS r
                            ON (p.userId = r.followedUserId)
         WHERE r.followerUserId = ?
            OR p.userId = ?
         ORDER BY p.createdAt DESC`;

    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    })
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts (`desc`, `img`,`createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    })
  })

}