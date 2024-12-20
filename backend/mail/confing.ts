


import nodemailer from "nodemailer";

const pass = process.env.PASS;
const user = process.env.MAIL;


// Create a transporter using SMTP details
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass,
    }
});


export const sendReminderEmail = async (to: string, subject: string, text: string): Promise<void> => {

    

if(!user || !pass){
    throw new Error("email or password not able to read from env")
}
    const mailOptions = {
      from: `EventTracker <${process.env.MAIL}>`,
      to,
      subject,
      text,
    };
  
    await transporter.sendMail(mailOptions);
}
