const { Router } = require("express");
const {
  mailMembresia,
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
  getPDF_CONTRATO,
  get_VENTAS,
} = require("../controller/venta.controller");
const { obtener_estado_membresia } = require("../middlewares/logicaSistema");
const router = Router();
/*
/api/venta
*/
router.post("/testmail/venta", mailMembresia);

router.post(
  "/post-ventas",
  extraerCredencialesCliente,
  extraerVentaMembresia,
  extraerProductos,
  extraerCitas,
  extraerPagos,
  postNewVenta,
  mailMembresia,
  postVenta
);
router.get("/get-ventas", get_VENTAS);
router.get("/get-id-ventas/:id", get_VENTA_ID);
router.post("/invoice-PDFcontrato", getPDF_CONTRATO);
router.get("/invoice-mail", mailMembresia);
module.exports = router;
