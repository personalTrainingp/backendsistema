const { Router } = require("express");
const {
  postDieta,
  obtenerDietasxCliente,
  deleteDieta,
  postClinico,
} = require("../controller/dieta.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/dieta
 */

router.post("/post-dieta/:id_cli", postDieta);
router.get("/get-dietas/:id_cli", obtenerDietasxCliente);
router.put("/delete-dieta/:id", deleteDieta);

router.post("/post-clinico/:id_cli", postClinico);
module.exports = router;
