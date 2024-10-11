const { Router } = require("express");
const {
  getIngresosxMESandAnio,
} = require("../controller/flujo-caja.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/flujo-caja
 */

router.get("/ingresos", getIngresosxMESandAnio);
module.exports = router;
