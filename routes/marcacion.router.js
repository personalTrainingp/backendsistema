const { Router } = require("express");
const {
  obtenerAsistenciaDeClientes,
  obtenerAsistenciaPorClientes
} = require("../controller/marcacion.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.get("/obtener-asistencia-clientes", obtenerAsistenciaDeClientes);

router.get("/obtener-asistencia-clientes-por-cliente", obtenerAsistenciaPorClientes);


module.exports = router;
