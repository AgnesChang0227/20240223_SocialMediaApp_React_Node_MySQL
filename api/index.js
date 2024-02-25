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
import relationshipRoutes from "./routes/relationship.js"
import multer from "multer";


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

//storage
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"../client/public/upload");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+file.originalname);
  }
})
const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
  const file = req.file;
  res.status(200).json(file.filename)
})

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/relationships",relationshipRoutes);


//port
app.listen(8080,()=>{
  console.log("API working")
})