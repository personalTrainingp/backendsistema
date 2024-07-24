const { Router } = require("express");
const multer = require("multer");
const { uploadBlob } = require("../../controller/upload/blob.controller");
const router = Router();
/*
/api/aporte
*/
const upload = multer();

router.post("/create/:uid_location", upload.single("file"), uploadBlob);
module.exports = router;
