const { Router } = require("express");
const {
  obtenerTipoCambioxFecha,
  obtenerTipoCambiosxFechas,
  buscar,
  eliminar,
  crear,
  actualizar,
  obtenerTipoCambio,
} = require("../controller/tipoCanbio.controller");
const router = Router();

router.get("/obtener-tipo-cambio", obtenerTipoCambioxFecha);
router.get("/obtener-rango-fechas", obtenerTipoCambiosxFechas);
router.get("/obtener-tipo-cambio-all", obtenerTipoCambio);
router.get("/buscar/:id", buscar);
router.post("/eliminar", eliminar);
router.post("/crear" , crear)
router.post("/actualizar" , actualizar)

module.exports = router;
