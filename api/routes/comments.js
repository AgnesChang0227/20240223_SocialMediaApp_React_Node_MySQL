import express from "express";
import {addComments, getComments} from "../controllers/comment.js";

const router = express.Router();

router.get("/",getComments);
router.post("/",addComments);

export default router;

