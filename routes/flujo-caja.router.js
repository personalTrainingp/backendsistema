const { Router } = require("express");
const {
  getIngresosxMESandAnio,
  getGastoxGrupo,getCreditoFiscal
} = require("../controller/flujo-caja.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/flujo-caja
 */

router.get("/ingresos", getIngresosxMESandAnio);

router.get("/get-gasto-x-grupo/:id_enterp", getGastoxGrupo);
router.get("/credito-fiscal/:id_enterp", getCreditoFiscal)
module.exports = router;
