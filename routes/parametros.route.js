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
  getLogicaEstadoMembresia,
  getParametrosVendedoresVendiendoTodo,
  getParametrosInversionistasRegistrados,
  getParametrosColaboradoresRegistrados,
  getParametrosTipoAportes,
  getParametrosVentaFitology,
  getCitasServicioxCliente,
  postParametros3,
} = require("../controller/Parametros.controller");
const { obtener_estado_membresia } = require("../middlewares/logicaSistema");
const router = Router();
/**
 * [API Documentation]
 * /api/parametros/
 */
// router.get("/get_params/forma_pago")
router.get(
  "/get_params/pack-venta-servicio/:tipo_serv",
  getParametrosVentaFitology
);
router.get("/get_params/citas-nutricionales/:id_cli", getCitasServicioxCliente);
router.get("/get_params/tipo_aportes", getParametrosTipoAportes);
router.get(
  "/get_params/get_estado_membresia_cli/:id_cli",
  getLogicaEstadoMembresia
);
router.get(
  "/get_params/grupo-gasto/:id_tipo_gasto",
  getParametroGrupoxTIPOGASTO
);
router.get("/get_params/forma_pago", getParametrosFormaPago);
router.get("/get_params/colaboradores", getParametrosColaboradoresRegistrados);
router.get(
  "/get_params/inversionistas",
  getParametrosInversionistasRegistrados
);
router.get(
  "/get_params/vendedores_vendiendo",
  getParametrosVendedoresVendiendoTodo
);
router.get("/get_params/programas-activos", getProgramasActivos);
router.get("/get_param/param_gasto/:id", getParametroGasto);
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
router.get(
  "/get_params/cita-disponible/:id_cli/:tipo_serv",
  getCitasDisponibleporClient
);
router.get("/get_params/params-tb-finanzas", getParametrosFinanzas);
router.get("/get_params/:entidad", getParametrosporEntidad);
router.get("/get_params/:id_param", getParametrosporId);

router.post("/post_param/:entidad/:sigla", postParametros);
router.get("/get_params/:entidad/:grupo", getParametrosporENTIDADyGRUPO);

router.post("/post-param-3/:entidad", postParametros3);
module.exports = router;
