const { Router } = require("express");
const {
  postUsuarioCliente,
  getUsuarioClientes,
  getUsuarioCliente,
  putUsuarioCliente,
  deleteUsuarioCliente,
  postUsuarioEmpleado,
  getUsuarioEmpleados,
  getUsuarioEmpleado,
  putUsuarioEmpleado,
  deleteUsuarioEmpleado,
  postUsuario,
  getUsuario,
  getUsuarios,
  putUsuario,
  deleteUsuario,
  loginUsuario,
  getUsuariosClientexID,
  revalidarToken,
} = require("../controller/usuario.controller");
const {
  extraerComentarios,
  extraerContactoEmergencia,
  extraerUpload,
} = require("../middlewares/extraerComentarios");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();
/**
 * [API Documentation]
 * /api/usuario
 */
router.post(
  "/post-cliente",
  validarJWT,
  extraerUpload,
  extraerComentarios,
  extraerContactoEmergencia,
  postUsuarioCliente
);
router.get("/get-clientes", validarJWT, getUsuarioClientes);
router.get("/get-cliente/id/:id_cli", validarJWT, getUsuariosClientexID);
router.get("/get-cliente/:uid_cliente", validarJWT, getUsuarioCliente);
router.put("/put-cliente/:uid_cliente", validarJWT, putUsuarioCliente);
router.get("/delete-cliente/:uid_cliente", validarJWT, deleteUsuarioCliente);

//usuario empleado
router.post(
  "/post-empleado",
  validarJWT,
  extraerUpload,
  extraerComentarios,
  extraerContactoEmergencia,
  postUsuarioEmpleado
);
router.get("/get-empleados", validarJWT, getUsuarioEmpleados);
router.get("/get-empleado/:uid_empleado", validarJWT, getUsuarioEmpleado);
router.put("/put-empleado/:uid_empleado", validarJWT, putUsuarioEmpleado);
router.get("/delete-empleado/:id_user", validarJWT, deleteUsuarioEmpleado);

//usuario login
router.post("/post-usuario", postUsuario);
router.get("/get-tb-usuarios", validarJWT, getUsuarios);
router.get("/get-usuario/:uid_user", getUsuario);
router.put("/put-usuario/:id_user", putUsuario);
router.post("/delete-usuario/:id_user", deleteUsuario);

router.post("/login", loginUsuario);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
