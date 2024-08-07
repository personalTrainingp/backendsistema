// const { Client } = require("whatsapp-web.js");
// const { WSPApi, clientWSP } = require("../config/whatssap-web");
// const { request, response } = require("express");

// const verifyWhatsAppNumber = () => {
//   const number = "51908902358"; // Suponiendo que el número viene en los parámetros de consulta

//   if (!number) {
//     return response.status(400).send("Número de teléfono no proporcionado.");
//   }

//   const chatId = `${number}@c.us`;

//   clientWSP
//     .isRegisteredUser(chatId)
//     .then((isRegistered) => {
//       request.isRegistered = isRegistered;
//       console.log(isRegistered, "numero esta registrado");
//       response.status(500).json({ msg: "Numero registrado" });
//       // next();
//     })
//     .catch((err) => {
//       console.error("Error al verificar el número:", err);
//       return response
//         .status(500)
//         .json({ msg: "Error al verificar el número." });
//     });
// };

// module.exports = verifyWhatsAppNumber;
