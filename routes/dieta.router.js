const { Router } = require("express");
const {
  postDieta,
  obtenerDietasxCliente,
  deleteDieta,
} = require("../controller/dieta.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/dieta
 */

router.post("/post-dieta/:id_cli", postDieta);
router.get("/get-dietas/:id_cli", obtenerDietasxCliente);
router.put("/delete-dieta/:id", deleteDieta);
module.exports = router;
