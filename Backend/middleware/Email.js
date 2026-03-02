import { varify_email_template, welcome_email_template } from "../libs/Emailtemplate.js";
import { transporter } from "./Email.config.js";
import { validateAndSend } from "./emailvalidation.js";

const defaultSender = process.env.SMTP_USER
  ? `"Mind Stock" <${process.env.SMTP_USER}>`
  : '"Mind Stock" <no-reply@mindstock.local>';
const mailFrom = process.env.MAIL_FROM || defaultSender;
const appUrl = process.env.APP_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173");

export const sentVarificationMail = async (email, name, varificationCode) => {
  try {
    if ((await validateAndSend(email)) === false) {
      console.log("invalid email");
      return;
    }

    const response = await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: "Varify Your Email",
      text: "varify your email", // Plain-text version of the message
      html: varify_email_template
        .replace("{{OTP}}", varificationCode)
        .replace("{{firstName}}", name), // HTML version of the message
    });

    console.log("Message sent:", response);
  } catch (error) {
    console.log(error);
  }
};

export const welcomeEmail = async (email, name) => {
  try {
    if ((await validateAndSend(email)) === false) {
      console.log("invalid email");
      return;
    }

    const response = await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: "Welcome To MindStock",
      text: "WElcome to MindStock", // Plain-text version of the message
      html: welcome_email_template
        .replace("{{firstName}}", name)
        .replace("{{dashboardLink}}", `${appUrl}/dashboard`), // HTML version of the message
    });

    console.log("Message sent:", response);
  } catch (error) {
    console.log(error);
  }
};
