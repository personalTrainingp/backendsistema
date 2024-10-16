const { Router } = require("express");
const {
    obtenerRelojZk
} = require("../controller/zk.controller.js");
const router = Router();

router.get("/obtener-tipo-cambio", obtenerRelojZk);
module.exports = router;
