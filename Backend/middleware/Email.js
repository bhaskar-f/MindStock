import { varify_email_template } from "../libs/Emailtemplate.js";
import { transporter } from "./Email.config.js";
import { validateAndSend } from "./emailvalidation.js";

export const sentVarificationMail = async (email, name, varificationCode) => {
  try {
    if ((await validateAndSend(email)) === false) {
      console.log("invalid email");
      return;
    }

    const response = await transporter.sendMail({
      from: '"Mind Stock" <maxrouteemail@gmail.com>',
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
      from: '"Mind Stock" <maxrouteemail@gmail.com>',
      to: email,
      subject: "Welcome To MindStock",
      text: "WElcome to MindStock", // Plain-text version of the message
      html: welcome_email_template.replace("{{firstName}}", name), // HTML version of the message
    });

    console.log("Message sent:", response);
  } catch (error) {
    console.log(error);
  }
};
