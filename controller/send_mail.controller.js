const send_mail_service = require("../service/mail")

const otp_verify = []


function generateOTP(mail) {
     const otp = Math.floor(100000 + Math.random() * 900000);
     const obj = {
          otp: otp,
          mail: mail
     }
     otp_verify.push(obj)
     console.log(otp_verify);
     setTimeout(() => {
          otp_verify.shift(); // Removes the first element
          console.log("OTP expired:", otp_verify);
     }, 2 * 60 * 1000);
     return otp;
   }


const send_mail_controller = async (req,res) => {


     try {
           const otp = generateOTP(req.body.mail)
          console.log(req.body.mail);
          const mail_sent = await send_mail_service(req.body.mail,otp);
               res.status(200).json({mess:"OTP sent successfully"})
          
     } catch (err) {
            console.log("error : ", err);
            res.status(400).json({mess: "internal server error"});
     }
}


// const otp_verify_controller = (req,res) => {
//      const index_mail = otp_verify.findIndex(obj => obj.mail === req.body.mail);
//       if (index_mail !== -1) {
//              if (req.body.mail === otp_verify[index_mail].mail && Number(req.body.otp) === otp_verify[index_mail].otp) {
//                res.status(200).json({mess: "OTP verified"})
//              } else {
//                res.status(400).json({mess: "Invalid OTP"})
//              }
//       } else {
//           res.status(400).json({mess: "otp is not generated for this mail address"})
//       }
// }

const otp_verify_controller = (req, res) => {
     const userEmail = req.body.mail; // Single email from user
     const userOTP = Number(req.body.otp); // Convert OTP to number
 
     // Find all OTPs generated for this email
     const matchedOTP = otp_verify.some(obj => obj.mail === userEmail && obj.otp === userOTP);
 
     if (matchedOTP) {
         return res.status(200).json({ mess: "OTP verified" });
     } else {
         return res.status(400).json({ mess: "Invalid OTP" });
     }
 };
 

console.log("time started");


module.exports = {send_mail_controller, otp_verify_controller}