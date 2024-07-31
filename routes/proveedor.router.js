const { Router } = require("express");
const {
  getTBProveedores,
  PostProveedores,
  getProveedor,
  deleteProveedor,
  updateProveedor,
} = require("../controller/proveedor.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.get("/obtener-proveedores", getTBProveedores);
router.post("/post-proveedor", PostProveedores);
router.get("/obtener-proveedor/:id", getProveedor);
router.put("/remove-proveedor/:id", deleteProveedor);
router.put("/update-proveedor/:id", updateProveedor);
module.exports = router;
