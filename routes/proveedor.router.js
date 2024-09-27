const { Router } = require("express");
const {
  getTBProveedores,
  PostProveedores,
  getProveedor,
  getProveedorxUID,
  deleteProveedor,
  updateProveedor,

  postContratoProv,
  getContratosxProv,
  getGastosxCodProv,
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
router.get("/obtener-gastos/:cod_trabajo", getGastosxCodProv);
router.post("/post-contrato-prov", postContratoProv);
module.exports = router;
