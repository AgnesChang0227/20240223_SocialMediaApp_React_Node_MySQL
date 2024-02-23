import express from "express";
const app = express();

//import routes
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import postRoutes from "./routes/posts.js"

//middleware
app.use(express.json())

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