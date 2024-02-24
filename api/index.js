import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

//import routes
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import postRoutes from "./routes/posts.js"


//middleware
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
})
app.use(express.json());
app.use(
  cors({
    origin:"http://localhost:3000"
    })
);
app.use(cookieParser())

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/posts",postRoutes);


//port
app.listen(8080,()=>{
  console.log("API working")
})