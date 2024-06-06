const { Router } = require("express");
const router = Router();
const {
  getImpuesto,
  postImpuesto,
  HISTORYpostImpuesto,
  getHistoryImpuesto,
  HISTORYgetxImpuesto,
  obtenerImpuestoIGV,
} = require("../controller/Impuesto.controller.js");
/**
 * [API Documentation]
 * /api/impuestos/
 */
router.get("/history/post_impuesto/:id_impuesto", HISTORYpostImpuesto);
router.get("/get_impuesto", getImpuesto);
router.post("/post_impuesto", postImpuesto);
router.get("/history/get_impuesto/:id_impuesto", HISTORYgetxImpuesto);
router.post("/history/post_impuesto/:id_impuesto", HISTORYpostImpuesto);
router.get("/igv/obtener-impuesto-hoy", obtenerImpuestoIGV);
module.exports = router;
