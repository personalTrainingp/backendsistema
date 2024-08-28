const { Router } = require("express");
const {
  obtenerTipoCambioxFecha,
  obtenerTipoCambiosxFechas,
} = require("../controller/tipoCanbio.controller");
const router = Router();

router.get("/obtener-tipo-cambio", obtenerTipoCambioxFecha);
router.get("/obtener-rango-fechas", obtenerTipoCambiosxFechas);
module.exports = router;
