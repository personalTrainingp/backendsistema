const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const { getModulos } = require("../controller/modulo");
const router = Router();
/**
 * [API Documentation]
 * /api/modulo/
 */

router.get("/obtener-modulos", getModulos);

module.exports = router;
