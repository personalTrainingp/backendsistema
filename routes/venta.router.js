const { Router } = require("express");
const {
  extraerPagos,
  extraerVentaMembresia,
  extraerCredencialesCliente,
  extraerFirma,
  extraerCitas,
  extraerProductos,
  postNewVenta,
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
} = require("../controller/venta.controller");
const { obtener_estado_membresia } = require("../middlewares/logicaSistema");
const router = Router();
/*
/api/venta
*/
router.post(
  "/post-ventas",
  extraerCredencialesCliente,
  extraerVentaMembresia,
  extraerProductos,
  extraerCitas,
  extraerPagos,
  postNewVenta,
  postVenta
);
router.post("/send-email", mailMembresia);
router.post("/traspaso-membresia", postTraspasoMembresia);
router.get("/get-ventas-x-fecha", getVentasxFecha);
router.get("/get-ventas", get_VENTAS);
router.post("/invoice-mail/:id_venta", mailMembresia);
router.get("/get-id-ventas/:id", get_VENTA_ID);
router.post("/invoice-PDFcontrato", obtener_contrato_pdf);
module.exports = router;
