// const { response, request } = require("express");
// const { clientWSP } = require("../config/whatssap-web");
// const { Cliente } = require("../models/Usuarios");

// const WspCitasServicio = (req = request, res = response, next) => {
//   try {
//     const { tel_cli } = req;
//     console.log(tel_cli);

//     if (!req.isRegistered) return next();
//     const chatId = `51${tel_cli}@c.us`;
//     const message =
//       "Hola, este es un mensaje enviado a través de whatsapp-web.js";
//     clientWSP
//       .sendMessage(chatId, message)
//       .then((response) => {
//         if (response.id.fromMe) {
//           console.log("Mensaje enviado exitosamente.");
//           next();
//         }
//       })
//       .catch((err) => {
//         console.error("Error al enviar el mensaje: ", err);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const verifyWhatsAppNumber = async (req = request, res = response, next) => {
//   try {
//     const data_cliente = await Cliente.findOne({
//       where: { id_cli: req.body.id_cli },
//     });
//     console.log(data_cliente);

//     const { tel_cli } = data_cliente;

//     if (!tel_cli) {
//       return res
//         .status(400)
//         .json({ msg: "Número de teléfono no proporcionado." });
//     }
//     const chatId = `51${tel_cli}@c.us`;
//     console.log(chatId);

//     try {
//       const isRegistered = await clientWSP.isRegisteredUser(chatId);
//       console.log(isRegistered, "en verifyWsp");
//       req.isRegistered = isRegistered;
//       req.tel_cli = tel_cli;
//       next();
//     } catch (err) {
//       req.isRegistered = false;
//       console.error("Error al verificar el número:", err);
//       return res.status(500).json({ msg: "Error al verificar el número." });
//     }
//   } catch (error) {
//     console.log("Error interno:", error);
//     return res.status(500).json({ msg: "Error interno del servidor." });
//   }
// };
// module.exports = {
//   WspCitasServicio,
//   verifyWhatsAppNumber,
// };
