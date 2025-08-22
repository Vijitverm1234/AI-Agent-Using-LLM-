 import nodemailer from 'nodemailer'
 import env from 'dotenv'
 env.config()
 export const sendMail=async(to,subject,text)=>{
    try {
  const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS
  },
});

 const info = await transporter.sendMail({
    from: 'INNGEST TMS',
    to,
    subject,
    text, // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("🥹 Mail error occur")
    }
 }