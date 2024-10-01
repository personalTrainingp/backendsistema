const { Router } = require("express");
const { postFiles } = require("../controller/usuario.controller.js");
const router = Router();
/**
 * [API Documentation]
 * /api/dieta
 */

router.post("/post-file/:uid-file", postFiles);
router.get("/get-file/:uid")
module.exports = router;
