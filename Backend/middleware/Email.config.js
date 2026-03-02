import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpSecure =
  process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1" || smtpPort === 465;

export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
<<<<<<< HEAD
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
=======
    user: process.env.MAIN_EMAIL,
    pass: process.env.MAIN_PASSWORD,
>>>>>>> 606bf6a8bcc0eb9f695bfb8987282b6039cfe904
  },
});
