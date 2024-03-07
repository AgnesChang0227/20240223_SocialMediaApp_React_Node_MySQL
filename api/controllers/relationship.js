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

// /lastActs?userId?=&num=5
export const latestActivities = (req, res) => {
  //id = currentUser id; num = limited results num
  const {id, num} = req.query;
  const q = `SELECT *
#                   posts with username, profilePic
             FROM (SELECT up.userId, name, profilePic, null as lastEdited, createdAt
                   FROM profiles as up
                            JOIN posts as P ON (p.userId = up.userId)
                   WHERE up.userId IN (SELECT followedUserId
                                       FROM relationships
                                       WHERE followerUserId = ?)
                   UNION
#                    profile
                   SELECT userId, name, profilePic, lastEdited, null as createdAt
                   FROM profiles
                   WHERE userId IN (SELECT followedUserId
                                    FROM relationships
                                    WHERE followerUserId = ?)) AS combined
             ORDER BY createdAt DESC
             LIMIT ?
  `

  db.query(q, [id, id, parseInt(num)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}

export const getFriends = (req, res) => {
  const {userId} = req.params;
  //check follower and followed
  const q = `SELECT p.userId, name, profilePic, city, website
             FROM (SELECT rA.followedUserId
                   FROM relationships AS rA
                            JOIN relationships AS rB
                                 ON rA.followedUserId = rB.followerUserId
                                     AND rA.followerUserId = rB.followedUserId
                   WHERE rB.followedUserId = ?) AS friend
                      JOIN profiles AS p ON friend.followedUserId = p.userId`
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data)
  })

}