const { Router } = require("express");
const {
  obtenerExtensionesPorTipo,
  postExtensionPorTipoPorId,
  obtenerExtensionPorId,
  putExtension,
  removeExtension,
} = require("../controller/extension_mem.controller");
const router = Router();
/**
 * /api/extension-membresia
 */
router.get("/get-extension/:tipo", obtenerExtensionesPorTipo);
router.put("/get-extension/:id", obtenerExtensionPorId);
router.post("/post-extension/:tipo/:idventa", postExtensionPorTipoPorId);
// router.put("/update-extension/:id", putExtension);
// router.put("/remove-extension/:id", removeExtension);

module.exports = router;
