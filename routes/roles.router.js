const { Router } = require("express");
const router = Router();
const {
  seccionPOST,
  seccionGET,
  moduleGET,
} = require("../controller/roles.controller.js");
const { validarJWT } = require("../middlewares/validarJWT.js");
/**
 * [API Documentation]
 * /api/rol/
 */

router.post("/seccion-post", seccionPOST);

router.get("/get-section-x-module/:modulo", seccionGET);
router.get("/get-module-x-rol", validarJWT, moduleGET);
module.exports = router;
