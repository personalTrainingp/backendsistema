const { Router } = require("express");
const {
  obtenerInventario,
  registrarArticulo,
  actualizarArticulo,
  eliminarArticulo,
  obtenerArticuloxID,
} = require("../controller/inventario.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.get("/obtener-inventario/:id_enterprice", obtenerInventario);
router.post(`/post-articulo/:id_enterprice`, registrarArticulo);
router.put("/remove-articulo/:id", eliminarArticulo);
router.put("/update-articulo/:id", actualizarArticulo);
router.get("/obtener-articulo/:id", obtenerArticuloxID);

module.exports = router;
