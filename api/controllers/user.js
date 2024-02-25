import {db} from "../connect.js";


export const getUser = (req,res)=>{
  const {userId} = req.params;
  const q = "SELECT * FROM users WHERE id = ?"

  db.query(q,[userId],(err,data)=>{
    if (err) return res.status(500).join(err);
    //separate the password
    const {password,...info}  = data[0];
    return res.json(info);
  })
}