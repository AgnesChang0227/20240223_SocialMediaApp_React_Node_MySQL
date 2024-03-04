import express from "express";
import {changePassword, login, logout, register, resendCode, verifiedCode} from "../controllers/auth.js";

const router = express.Router();

router.post("/login",login)
router.get("/logout",logout)
router.post("/register",register)
router.post("/verify",verifiedCode)
router.get("/resend/:email",resendCode)
router.post("/changePassword",changePassword)

export default router;

