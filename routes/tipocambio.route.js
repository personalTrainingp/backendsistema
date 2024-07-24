const { Router } = require("express");
const {
  obtenerTipoCambioxFecha,
} = require("../controller/tipoCanbio.controller");
const router = Router();

router.get("/obtener-tipo-cambio", obtenerTipoCambioxFecha);
module.exports = router;
