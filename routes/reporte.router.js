const { Router } = require("express");
const {
  getReporteSeguimiento,
  getReporteProgramas,
  getReporteVentasPrograma_COMPARATIVACONMEJORANO,
  getReporteVentasPrograma_EstadoCliente,
  getReporteDeVentasTickets,
  getReporteDeClientesFrecuentes,
  getReporteDeProgramasXsemanas,
  getReporteDeEgresos,
  getReporteDeUtilidadesTotal,
} = require("../controller/reporte.controller");
const router = Router();
/**
 * /api/reporte
 */
router.get("/reporte-seguimiento-membresia", getReporteSeguimiento);
router.get("/reporte-resumen-utilidad", getReporteDeUtilidadesTotal);
router.get("/reporte-egresos", getReporteDeEgresos);
router.get("/reporte-programas", getReporteProgramas);
router.get(
  "/reporte-ventas-programa-comparativa-con-mejor-anio",
  getReporteVentasPrograma_COMPARATIVACONMEJORANO
);
router.get(
  "/reporte-programa-estadocliente",
  getReporteVentasPrograma_EstadoCliente
);
router.get("/reporte-ventas-tickets", getReporteDeVentasTickets);
router.get("/reporte-programa-x-cliente", getReporteDeClientesFrecuentes);
router.get("/reporte-programa-x-semanas", getReporteDeProgramasXsemanas);
module.exports = router;
