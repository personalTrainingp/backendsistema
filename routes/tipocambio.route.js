const { Router } = require("express");
const {
  obtenerTipoCambioxFecha,
  obtenerTipoCambiosxFechas,
  obtenerTipoCambio
} = require("../controller/tipoCanbio.controller");
const router = Router();

router.get("/obtener-tipo-cambio", obtenerTipoCambioxFecha);
router.get("/obtener-rango-fechas", obtenerTipoCambiosxFechas);
router.get("/obtener-tipo-cambio-all", obtenerTipoCambio)
module.exports = router;
