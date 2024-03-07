import {db} from "../services/connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getUser = (req, res) => {
  const {userId} = req.params;

  const q = "SELECT * FROM profiles WHERE userId = ?"

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!!!data.length) return res.status(404).json("User not founded");
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

    const q = 'UPDATE profiles SET `name`=?,`desc`=?,`city`=?,`website`=?,`coverPic`=?,`profilePic`=?,`lastEdited`=? WHERE userId=?'
    const values = [
      req.body.name,
      req.body.desc,
      req.body.city,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated");
      return res.status(403).json("You can only update your profile")
    })
  })

}

export const suggestedUsers = (req, res) => {

  const com = `SELECT userId, name, profilePic, followerCount, NULL AS followedUserId
#               5 users that have most followers
               FROM (SELECT followedUserId, COUNT(followerUserId) AS followerCount
                     FROM relationships AS r
                     WHERE followedUserId != ?
                     GROUP BY followedUserId
                     ORDER BY followerCount DESC
                     LIMIT 5) AS u
                        JOIN profiles AS p ON (u.followedUserId = p.userId)
               UNION ALL
#                user's followed user's followed
               SELECT userId, name, profilePic, NULL AS followerCount, followedUserId
               FROM (SELECT followedUserId, followerUserId
                     FROM relationships AS r
                     WHERE followerUserId IN (SELECT followedUserId
                                              FROM relationships
                                              WHERE followerUserId = ?)
                       AND followedUserId != ?
                     LIMIT 5) AS u2
                        JOIN profiles AS p ON u2.followedUserId = p.userId;`
  db.query(com, [35,35,35], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!!!data.length) return res.status(404).json("User not founded");
    //separate the password
    const {password, ...info} = data[0];
    return res.json(info);
  })
}