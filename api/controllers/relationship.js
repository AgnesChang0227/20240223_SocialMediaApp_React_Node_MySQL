import {db} from "../services/connect.js";
import jwt from "jsonwebtoken";

//get followers
export const getRelationships = (req, res) => {
  const q = `SELECT followerUserId
             FROM relationships
             WHERE followedUserId = ?`

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map(relationship => relationship.followerUserId));
  })
}

//follow
export const addRelationship = (req, res) => {
  // console.log(req.query.userId)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.userId,
    ]

    db.query(q, [values], (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    })
  })
}

//unfollow
export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Please login first");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM relationships WHERE `followerUserId`=? AND `followedUserId`=?"

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    })
  })
}

// /lastActs?num=5
export const latestActivities = (req, res) => {
  const userId = req.query.id;
  const q = `SELECT up.userId, up.name, up.lastEdited, p.createdAt
             FROM relationships AS r
                      join profiles as up on (r.followedUserId = up.userId)
                      join posts as p on (r.followedUserId = p.userId)
             WHERE followerUserId = ?
             ORDER BY p.createdAt DESC
             LIMIT 5`

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}