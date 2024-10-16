// const qrcode = require("qrcode-terminal");
// const { Client, LocalAuth } = require("whatsapp-web.js");
// // Directorio donde se almacenará la sesión
// // Cargar variables de entorno

// const clientWSP = new Client({
//   authStrategy: new LocalAuth(),
//   // session: sessionData,
//   // webVersionCache: {
//   //   type: "remote",
//   //   remotePath:
//   //     "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
//   // },
// });

// clientWSP.on("qr", (qr) => {
//   // Generate and scan this code with your phone
//   qrcode.generate(qr, { small: true });
//   console.log(
//     "Escanea este código QR con tu WhatsApp para iniciar la sesión.",
//     qr
//   );
// });
// // Manejar la autenticación exitosa
// clientWSP.on("ready", () => {
//   console.log("Cliente autenticado y listo para usarse.");
// });

// // Manejar errores de autenticación
// clientWSP.on("auth_failure", (msg) => {
//   console.error("Error de autenticación", msg);
//   // fs.unlinkSync(SESSION_FILE_PATH); // Eliminar sesión inválida
// });
// //   client.on("message", (msg) => {
// //     if (msg.body == "") {
// //       msg.reply("pong");
// //     }
// //   });

// clientWSP.initialize();
// module.exports = {
//   clientWSP,
// };

// /*
// // Escucha mensajes entrantes
//   client.on("message", (message) => {
//     console.log(`Received message from ${message.from}: ${message.body}`);

//     // Responder al mensaje
//     if (message.body === "Hola") {
//       message.reply("¡Hola! ¿Cómo puedo ayudarte?");
//     } else if (message.body === "Adiós") {
//       message.reply("¡Hasta luego!");
//     }
//   });

//   client.on("ready", () => {
//     console.log("Conexion exitosa");

//     // Número al que quieres enviar el mensaje
//     const number = "51908902358";
//     // Formato requerido por whatsapp-web.js
//     const chatId = `${number}@c.us`;
//     // Mensaje a enviar
//     const message =
//       "Hola, este es un mensaje enviado a través de whatsapp-web.js";

//     client
//       .sendMessage(chatId, message)
//       .then((response) => {
//         if (response.id.fromMe) {
//           console.log("Mensaje enviado exitosamente.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error al enviar el mensaje: ", err);
//       });
//   });
// */
