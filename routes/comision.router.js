const { Router } = require("express");
const router = Router();
const { postComision } = require("../controller/comision.controller");
/**
 * [API Documentation]
 * /api/comision/
 */
router.post("/post-comision", postComision);
module.exports = router;
