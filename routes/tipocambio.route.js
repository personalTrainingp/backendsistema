const { Router } = require("express");
const {
  obtenerTipoCambioxFecha,
} = require("../controller/tipoCanbio.controller");
const router = Router();

router.get("/obtenerTipoCambio", obtenerTipoCambioxFecha);
module.exports = router;
