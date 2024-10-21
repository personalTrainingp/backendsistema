const { Router } = require("express");
const {
  obtenerAsistenciaDeClientes,
} = require("../controller/marcacion.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.get("/obtener-asistencia-clientes", obtenerAsistenciaDeClientes);

module.exports = router;
