import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {app,server} from "./services/socket.js";

import cookieParser from "cookie-parser";
import cors from "cors";
//import routes
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import postRoutes from "./routes/posts.js"
import relationshipRoutes from "./routes/relationship.js"
import {uploadCloud} from "./services/uploadImage.js";
import {uploadMulter} from "./services/uploadMulter.js";

//middleware
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
})
app.use(express.json());
app.use(cors({origin:"http://localhost:8088"}));
app.use(cookieParser())

//只接收 formdata 中名爲 'image' 的欄位
app.post("/api/upload", uploadMulter.single("image"), uploadCloud);

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/relationships",relationshipRoutes);


//port
const port = 8080;
server.listen(port,()=>{
  console.log(`API working on ${port}`)
})