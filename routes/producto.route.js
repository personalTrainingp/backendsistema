const { Router } = require("express");
const { postProducto,
    getProducto,
    getTBProductos,
    updateProducto,
    deleteProducto } = require("../controller/producto.controller");
const router = Router();

/**
 * /api/producto
 */
router.post("/post-producto", postProducto);
router.get("/get-producto/:id", getProducto);
router.get("/get-tb-productos", getTBProductos);
router.put("/put-producto/:id", updateProducto);
router.put("/delete-producto/:id", deleteProducto);


module.exports = router;
