const { Router } = require("express");
const {
  extraerPagos,
  extraerVentaMembresia,
  extraerCredencialesCliente,
  extraerFirma,
  extraerCitas,
  extraerProductos,
  postNewVenta,
  extraerTraspasos,
  extraerVentaTransferenciaMembresia,
} = require("../middlewares/extraerVentas");
const {
  postVenta,
  get_VENTA_ID,
  mailMembresia,
  getPDF_CONTRATO,
  get_VENTAS,
  getVentasxFecha,
  obtener_contrato_pdf,
  postTraspasoMembresia,
  estadosClienteMembresiaVar,
  comparativaPorProgramaApi,
  obtenerContratosClientes,
  obtenerVentasMembresiaxEmpresa,
  obtenerClientesVentas,
} = require("../controller/venta.controller");
const { obtener_estado_membresia } = require("../middlewares/logicaSistema");
const router = Router();
/*
/api/venta
*/
router.post(
  "/post-ventas/:id_enterprice",
  extraerCredencialesCliente,
  extraerVentaMembresia,
  extraerTraspasos,
  extraerVentaTransferenciaMembresia,
  extraerProductos,
  extraerCitas,
  extraerPagos,
  postNewVenta,
  postVenta
);
router.get("/cliente-ventas", obtenerClientesVentas);
router.get(
  "/get-ventas-membresia-x-empresa/:id_empresa",
  obtenerVentasMembresiaxEmpresa
);
router.post("/send-email", mailMembresia);
router.post("/traspaso-membresia", postTraspasoMembresia);
router.get("/get-ventas-x-fecha", getVentasxFecha);
router.get("/get-ventas/:id_empresa", get_VENTAS);
router.post("/invoice-mail/:id_venta", mailMembresia);
router.get("/get-id-ventas/:id", get_VENTA_ID);
router.post("/invoice-PDFcontrato", obtener_contrato_pdf);
router.post("/estado-membresia", estadosClienteMembresiaVar);
router.get(
  "/obtener-contratos-clientes/:id_enterprice",
  obtenerContratosClientes
);
router.get("/comparativaPorProgramaApi/?:fecha", comparativaPorProgramaApi);
module.exports = router;
