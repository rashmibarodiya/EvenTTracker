

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransporter({
    service : process.env.EMAIL,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }}


)

export const sendReminderEmail = async (to: string, subject: string, text: string): Promise<void> => {
    const mailOptions = {
      from: process.env.MAIL,
      to,
      subject,
      text,
    };
  
    await transporter.sendMail(mailOptions);
}
