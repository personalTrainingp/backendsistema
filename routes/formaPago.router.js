const { Router } = require("express");
const router = Router();
const { formaPagoPOST } = require("../controller/formaPago.controller.js");
/**
 * [API Documentation]
 * /api/formPago/
 */

router.post("/formapago-post", formaPagoPOST);
module.exports = router;