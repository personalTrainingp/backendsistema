const { Router, Route } = require("express");

const { GastoPorCargo , ClienteAuth } = require("../controller/recursosHumano");

const router = Router();

router.get("/gasto-por-cargo",GastoPorCargo);
router.get("/clienteAuth" , ClienteAuth);

module.exports = router;
