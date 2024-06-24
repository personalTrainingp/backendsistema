const { Router } = require("express");
const { getReporteSeguimiento, getReporteEgresos } = require("../controller/reporte.controller");
const router = Router();
/**
 * /api/reporte
 */
router.get("/reporte-seguimiento-membresia", getReporteSeguimiento);
router.get("/reporte-egresos", getReporteEgresos)
module.exports = router;
