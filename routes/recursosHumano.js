const { Router, Route } = require("express");
const router = Router();

const { GastoPorCargo } = require("../controller/recursosHumano");

router.get("/gasto-por-cargo",GastoPorCargo);

module.exports = router;
