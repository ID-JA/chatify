const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendConfirmationEmail = ({ _id, email }) => {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const otp = Math.floor(1000 + Math.random() * 9000);

    const mailOptions = {
      from: process.env.EMAIL,
      to: `<${email}>`,
      subject: "Confirmation email",
      html: `Use this OTP <b>${otp}</b> to confirm your account.`,
    };

    // Sending the email
    transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        reject(new nodemailer.SendMailError(err));
      } else {
        console.log("email was sent successfully " + data);
        resolve(otp);
      }
    });
  });
};

module.exports = { sendConfirmationEmail };

// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");

// const sendConfirmationEmail = ({ _id, username, email }) => {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.APP_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   //   Create the confirmation URL
//   const emailToken = jwt.sign(
//     { userID: _id, username, email },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "1d",
//     }
//   );
//   const url = `${process.env.BASE_URL}/api/auth/confirmaccount/${_id}/${emailToken}`;

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: `<${email}>`,
//     subject: "Confirmation email",
//     html: `Please click on this link to confirm your account <a href="${url}">${url}</a>`,
//   };

//   // Sending the email
//   transport.sendMail(mailOptions, (err, data) => {
//     if (err) throw new nodemailer.SendMailError(err);
//     else console.log("email was sent successfully " + data);
//   });
// };

// module.exports = { sendConfirmationEmail };
