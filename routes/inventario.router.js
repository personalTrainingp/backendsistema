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

router.get("/obtener-inventario", obtenerInventario);
router.post("/post-articulo", registrarArticulo);
router.put("/remove-articulo/:id", eliminarArticulo);
router.put("/update-articulo/:id", actualizarArticulo);
router.get("/obtener-articulo/:id", obtenerArticuloxID);

module.exports = router;
