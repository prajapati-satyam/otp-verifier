require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, 
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});


async function send_mail_service(tomailaddres,generateOTP) {
  
  const info = await transporter.sendMail({
    from: `"OTP for discord" <${process.env.USER}>`, 
    to: tomailaddres, 
    subject: "one time password", 
    text: "Otp", 
    html: `<b>Otp for discord is : ${generateOTP}</b>`, 
  });

  console.log("Message sent: %s", info);
  
}


module.exports = send_mail_service 