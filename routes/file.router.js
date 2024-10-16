const { Router } = require("express");
const {
  postFiles,
  deleteFilexID,
  obtenerFilesxUIDFILE,
} = require("../controller/Files.controller");

const router = Router();
/**
 * [API Documentation]
 * /api/file
 */

router.post("/post-file/:uid_file", postFiles);

router.put("/delete-file/:id_file", deleteFilexID);
router.get("/get-files/:uid_Location", obtenerFilesxUIDFILE);

module.exports = router;
