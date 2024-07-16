const { Router } = require("express");
const {
  postProducto,
  getProducto,
  getTBProductos,
  updateProducto,
  deleteProducto,
} = require("../controller/producto.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

/**
 * /api/producto
 */
router.post("/post-producto", validarJWT, postProducto);
router.get("/get-producto/:id", validarJWT, getProducto);
router.get("/get-tb-productos", validarJWT, getTBProductos);
router.put("/put-producto/:id", validarJWT, updateProducto);
router.put("/delete-producto/:id", validarJWT, deleteProducto);

module.exports = router;
