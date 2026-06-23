require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "NOT LOADED");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer not ready:", error.message);
  } else {
    console.log("✅ Mailer ready to send emails");
  }
});

const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"BinIQ" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      code: error.code,
      response: error.response,
    });
    throw error;
  }
};

module.exports = { sendMail };