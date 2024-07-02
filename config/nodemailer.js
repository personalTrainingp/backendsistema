const nodemailer = require("nodemailer");
require("dotenv").config();
const env = process.env;

// const transporterU = nodemailer.createTransport({
//   host: "mail.personaltraining.com.pe",
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: env.USER_EMAIL,
//     pass: env.PASSWORD_EMAIL,
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
// });
// transporterU.verify().then(() => {
//   console.log("Listo para enviar mensajes");
// });
const transporterU = () => {
  return "hola";
};

module.exports = transporterU;
