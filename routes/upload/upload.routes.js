const { Router } = require("express");
const {
  multerUpload,
  multerUploadLogo,
  multerUploadAvatar,
  multerUploadTarjeta,
} = require("../../middlewares/multer");
const {
  uploadLogo,
  uploadUpdate,
  uploadAvatar,
  getUpload,
  uploadTarjeta,
} = require("../../controller/upload/upload.controller");
const { validarUploadsPath } = require("../../middlewares/validarUploadsPath");
const { validarFile } = require("../../middlewares/validarFile");

const router = Router();
/**
 * [API Documentation]
 * /api
 */
// router.post("/upload", multerUpload.single("file"), upload);
router.put(
  "/put/upload/logo/:uid",
  multerUploadLogo.single("logo"),
  uploadUpdate
);

router.post(
  "/upload/logo/:uidLocation",
  multerUploadLogo.single("logo"),
  uploadLogo
);
router.post(
  "/upload/avatar/:uidLocation",
  multerUploadAvatar.single("avatar"),
  uploadAvatar
);
router.post("/upload/")
router.post(
  "/upload/tarjeta/:uidLocation",
  multerUploadTarjeta.single("tarjeta"),
  uploadTarjeta
);

router.get("/upload/get-upload/:uidLocation", getUpload);

module.exports = router;
