const nodemailer = require("nodemailer");
require("dotenv").config();
const env = process.env;

const transporterU = nodemailer.createTransport({
  host: "mail.change.com.pe",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: env.EMAIL_CONTRATOS,
    pass: env.PSW_CONTRATOS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

// Verifica la conexión SMTP
transporterU.verify((error, success) => {
  if (error) {
    console.log("Error en la conexión SMTP:", error);
  } else {
    console.log("Listo para enviar mensajes");
  }
});
// const transporterU = () => {
//   return "hola";
// };

module.exports = transporterU;
