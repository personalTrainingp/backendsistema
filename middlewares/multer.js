const multer = require("multer");
const {
  urlArchivos,
  urlArchivoLogos,
  urlArchivoAvatars,
  urlArchivoTarjetas,
} = require("../config/constant");
const { extname } = require("path");

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: urlArchivos,
    filename(req, file, callback) {
      const extension = extname(file.originalname);
      const name = file.originalname.split(extension)[0];
      callback(null, `${name}-${Date.now()}${extension}`);
    },
  }),
  limits: { fieldSize: 15000000 },
});

const multerUploadLogo = multer({
  storage: multer.diskStorage({
    destination: urlArchivoLogos,
    filename(req, file, callback) {
      const extension = extname(file.originalname);
      const name = file.originalname.split(extension)[0];
      callback(null, `${name}-${Date.now()}${extension}`);
    },
  }),
  limits: { fieldSize: 15000000 },
});

const multerUploadAvatar = multer({
  storage: multer.diskStorage({
    destination: urlArchivoAvatars,
    filename(req, file, callback) {
      const extension = extname(file.originalname);
      const name = file.originalname.split(extension)[0];
      callback(null, `${name}-${Date.now()}${extension}`);
    },
  }),
  limits: { fieldSize: 15000000 },
});
const multerUploadTarjeta = multer({
  storage: multer.diskStorage({
    destination: urlArchivoTarjetas,
    filename(req, file, callback) {
      const extension = extname(file.originalname);
      const name = file.originalname.split(extension)[0];
      callback(null, `${name}-${Date.now()}${extension}`);
    },
  }),
  limits: { fieldSize: 15000000 },
});
module.exports = {
  multerUpload,
  multerUploadLogo,
  multerUploadAvatar,
  multerUploadTarjeta,
};
