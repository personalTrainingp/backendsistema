const { Router } = require("express");
const {
  getIngresosxMESandAnio,
  getGastoxGrupo,
} = require("../controller/flujo-caja.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/flujo-caja
 */

router.get("/ingresos", getIngresosxMESandAnio);

router.get("/get-gasto-x-grupo/:id_enterp", getGastoxGrupo);
module.exports = router;
