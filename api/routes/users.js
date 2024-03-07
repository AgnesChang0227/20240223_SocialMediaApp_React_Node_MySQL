import express from "express";
import {getUser, suggestedUsers, updateUser} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId",getUser)
router.put("/",updateUser)
router.get("/suggestion",suggestedUsers)

export default router;

