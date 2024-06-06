const path = require("path");
const types = require("../types/types");

require("dotenv").config();
const env = process.env;
const urlArchivos = path.join(__dirname, "../uploads");
const urlArchivoAvatars = path.join(__dirname, "../uploads/avatares");
const urlArchivoTarjetas = path.join(__dirname, "../uploads/tarjetas");
const urlArchivoLogos = path.join(__dirname, "../uploads/logo");
const ipFileServer = `${types.urls.host}:${env.PORT}${types.urls.apiImg}`;
console.log(ipFileServer);
module.exports = {
  urlArchivos,
  urlArchivoAvatars,
  ipFileServer,
  urlArchivoLogos,
  urlArchivoTarjetas,
};
