const { Router } = require("express");
const {
  getTBProveedores,
  PostProveedores,
  getProveedor,
  getProveedorxUID,
  deleteProveedor,
  updateProveedor,
  getContratoxID,
  postContratoProv,
  getContratosxProv,
  getGastosxCodProv,
  descargarContratoProvPDF,
} = require("../controller/proveedor.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.get("/obtener-proveedores", getTBProveedores);
router.get("/obtener-proveedor-uid/:uid", getProveedorxUID);
router.post("/post-proveedor", PostProveedores);
router.get("/obtener-proveedor/:id", getProveedor);
router.put("/remove-proveedor/:id", deleteProveedor);
router.put("/update-proveedor/:id", updateProveedor);

router.get("/obtener-contratos/:id_prov", getContratosxProv);
router.get("/obtener-contrato/:id", getContratoxID);
router.get("/obtener-gastos/:cod_trabajo/:tipo_moneda", getGastosxCodProv);
router.post("/post-contrato-prov", postContratoProv);

router.get("/obtener-contrato-prov/:id_contratoprov", descargarContratoProvPDF);
module.exports = router;
