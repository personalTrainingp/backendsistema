const { Router } = require("express");
const {
  getParametros,
  postParametros,
  getParametrosporEntidad,
  getParametrosporProveedor,
  getParametrosporCliente,
  getParametrosporProductosCategoria,
  getParametrosEmpleadosxDep,
  getParametrosLogosProgramas,
  getParametroSemanaPGM,
  getParametroHorariosPGM,
  getParametroTarifasSM,
  getParametroMetaxAsesor,
  getParametrosFormaPago,
  getParametrosporId,
  getParametrosporENTIDADyGRUPO,
  getCitasDisponibleporClient,
  getParametrosFinanzas,
  getParametroGrupoxTIPOGASTO,
  getParametroGasto,
  getProgramasActivos,
} = require("../controller/Parametros.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/parametros/
 */
router.get("/get_params/programas-activos", getProgramasActivos);
router.get("/get_param/param_gasto/:id", getParametroGasto);
router.post("/post_param/:entidad/:sigla", postParametros);
router.get("/get_params/producto/proveedor", getParametrosporProveedor);
router.get("/get_params/clientes", getParametrosporCliente);
router.get("/get_params/empleados/:departamento", getParametrosEmpleadosxDep);
router.get(
  "/get_params/productos/:categoria",
  getParametrosporProductosCategoria
);
router.get("/get_params/programaslogos", getParametrosLogosProgramas);
router.get("/get_params/semanas_PGM/:id_pgm", getParametroSemanaPGM);
router.get("/get_params/horario_PGM/:id_pgm", getParametroHorariosPGM);
router.get("/get_params/tarifa_sm/:id_st", getParametroTarifasSM);
router.get("/get_params/meta_asesor/:id_meta", getParametroMetaxAsesor);
router.get("/get_params/cita-disponible/:id_cli", getCitasDisponibleporClient);
router.get("/get_params/params-tb-finanzas", getParametrosFinanzas);
router.get("/get_params/:entidad", getParametrosporEntidad);
router.get("/get_params/:id_param", getParametrosporId);
router.get("/get_params/forma_pago", getParametrosFormaPago);

router.get(
  "/get_params/grupo-gasto/:id_tipo_gasto",
  getParametroGrupoxTIPOGASTO
);
router.get("/get_params/:entidad/:grupo", getParametrosporENTIDADyGRUPO);
module.exports = router;
