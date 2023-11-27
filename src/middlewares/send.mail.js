import { createTransport } from "nodemailer";
import { tcHandle } from "../utils/try.handle.js";


export const sendMail = tcHandle(async(text)=>{
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    })
    await transporter.sendMail({subject:"Contact Request From Portfolio",
    to:process.env.MYMAIL,from:process.env.MYMAIL,text})
})
