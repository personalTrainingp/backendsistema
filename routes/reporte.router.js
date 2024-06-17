const { Router } = require("express");
const { getReporteSeguimiento } = require("../controller/reporte.controller");
const router = Router();
/**
 * /api/reporte
 */
router.get("/reporte-seguimiento-membresia", getReporteSeguimiento);
module.exports = router;
