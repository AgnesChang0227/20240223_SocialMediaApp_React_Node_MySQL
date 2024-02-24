import {db} from "../connect.js";


export const getPost = (req,res)=>{
  //p = posts , u= users;
  // p join u ,u.id = p.userId
  const q = "SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)"

  db.query(q,(err,data)=>{
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}