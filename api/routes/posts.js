import express from "express";
import {addPost, getPost} from "../controllers/post.js";

const router = express.Router();

router.get("/",getPost)
router.post("/",addPost)

export default router;

