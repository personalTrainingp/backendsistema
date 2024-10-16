const { Router } = require("express");
const {
  postDieta,
  obtenerDietasxCliente,
  deleteDieta,
  postClinico,
  obtenerTODOHistorialClinicoxcliente,
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
router.get("/get-h-clinico/:id_cli", obtenerTODOHistorialClinicoxcliente)
module.exports = router;
