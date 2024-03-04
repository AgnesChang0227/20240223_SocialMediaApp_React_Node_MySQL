import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const nodemail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})
