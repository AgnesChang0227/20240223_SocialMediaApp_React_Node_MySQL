import express from "express";
import {login, logout, register, resendCode, verifiedCode} from "../controllers/auth.js";

const router = express.Router();

router.post("/login",login)
router.post("/logout",logout)
router.post("/register",register)
router.post("/verify",verifiedCode)
router.get("/resend/:email",resendCode)

export default router;

