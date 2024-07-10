const { request, response } = require("express");
const { Parametros } = require("../models/Parametros");
const { Proveedor } = require("../models/Proveedor");
const { Cliente, Empleado } = require("../models/Usuarios");
const { Sequelize, where } = require("sequelize");
const { Producto } = require("../models/Producto");
const {
  ProgramaTraining,
  SemanasTraining,
  TarifaTraining,
} = require("../models/ProgramaTraining");
const { ImagePT } = require("../models/Image");
const { HorarioProgramaPT } = require("../models/HorarioProgramaPT");
const { MetaVSAsesor } = require("../models/Meta");
const { FormaPago } = require("../models/Forma_Pago");
const { Cita } = require("../models/Cita");
const {
  detalleVenta_citas,
  Venta,
  detalleVenta_membresias,
} = require("../models/Venta");
const { Servicios } = require("../models/Servicios");
const { ParametroGastos } = require("../models/GastosFyV");
const getParametrosporId = async (req = request, res = response) => {
  const { id_param } = req.params;
  try {
    const parametro = await Parametros.findOne({
      where: { id_param: id_param },
    });
    if (!parametro) {
      return res.status(200).json({ msg: "nohay" });
    }
    return res.status(200).json(parametro);
  } catch (error) {
    res.status(505).json(error);
  }
};
const getParametrosxEntidadxGrupo = async (req = request, res = response) => {
  const {} = req.params;
  try {
    const parametros = await Parametros.findAll({ where: { flag: true } });
    return res.status(200).json(parametros);
  } catch (error) {
    res.status(505).json(error);
  }
};
const getParametros = async (req = request, res = response) => {
  try {
    const parametros = await Parametros.findAll({ where: { flag: true } });
    return res.status(200).json(parametros);
  } catch (error) {
    res.status(505).json(error);
  }
};
const getCitasDisponibleporClient = async (req = request, res = response) => {
  try {
    const { id_cli, tipo_serv } = req.params;
    // Obtener las citas disponibles desde la tabla tb_detallecita
    const citasDisponibles = await Venta.findAll({
      where: { flag: true, id_cli: id_cli },
      attributes: [
        ["id", "value"],
        ["id_cli", "cliente"],
      ],
      include: [
        {
          model: detalleVenta_citas,
          attributes: ["cantidad", "id"],
          include: [
            {
              model: Servicios,
              attributes: ["id", "nombre_servicio"],
              where: { flag: true, tipo_servicio: tipo_serv },
            },
          ],
        },
      ],
    });
    console.log(citasDisponibles);

    // Obtener las citas programadas desde la tabla tb_citas
    const citasProgramadas = await Cita.findAll({
      where: { id_cli: id_cli },
      attributes: ["id_detallecita"],
    });

    // Convertir resultados a JSON
    // const citasDisponiblesJSON = citasDisponibles.map((cita) => cita.toJSON());
    // const citasProgramadasJSON = citasProgramadas.map((cita) => cita.toJSON());

    // // Reducir las citas disponibles a un solo objeto
    // const mergedData = citasDisponiblesJSON.reduce((acc, curr) => {
    //   if (!acc) {
    //     acc = {
    //       value: curr.value,
    //       cliente: curr.cliente,
    //       detalle_ventaCitas: [],
    //     };
    //   }

    //   curr.detalle_ventaCitas.forEach((detalle) => {
    //     const existingDetalle = acc.detalle_ventaCitas.find(
    //       (d) => d.id_cita === detalle.id_cita
    //     );
    //     if (existingDetalle) {
    //       existingDetalle.cantidad = (
    //         parseInt(existingDetalle.cantidad) + parseInt(detalle.cantidad)
    //       ).toString();
    //     } else {
    //       acc.detalle_ventaCitas.push({ ...detalle });
    //     }
    //   });

    //   return acc;
    // }, null);

    // Crear un objeto para contar las citas programadas por id_cita
    // const citasProgramadasCount = citasProgramadasJSON.reduce((acc, curr) => {
    //   acc[curr.id_cita] = (acc[curr.id_cita] || 0) + 1;
    //   return acc;
    // }, {});

    // Restar las citas programadas de las citas disponibles
    // mergedData.detalle_ventaCitas = mergedData.detalle_ventaCitas.map(
    //   (detalle) => {
    //     const programadas = citasProgramadasCount[detalle.id_cita] || 0;
    //     detalle.cantidad = (
    //       parseInt(detalle.cantidad) - programadas
    //     ).toString();
    //     return detalle;
    //   }
    // );

    // Filtrar las citas donde la cantidad es mayor que 0
    // mergedData.detalle_ventaCitas = mergedData.detalle_ventaCitas.filter(
    //   (detalle) => parseInt(detalle.cantidad) > 0
    // );

    res.status(200).json(citasDisponibles);
  } catch (error) {
    res.status(505).json(error);
  }
};
const getParametrosporEntidad = async (req, res) => {
  const { entidad } = req.params;
  try {
    const parametros = await Parametros.findAll({
      where: { entidad_param: entidad, flag: true },
      attributes: [
        ["id_param", "value"],
        ["label_param", "label"],
      ],
    });
    res.status(200).json(parametros);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosporENTIDADyGRUPO = async (req = request, res = response) => {
  const { grupo, entidad } = req.params;
  try {
    const parametros = await Parametros.findAll({
      where: { entidad_param: entidad, grupo_param: grupo, flag: true },
      attributes: [
        ["id_param", "value"],
        ["label_param", "label"],
      ],
    });
    res.status(200).json(parametros);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosporProveedor = async (req, res) => {
  try {
    const parametros = await Proveedor.findAll({
      where: { flag: true },
      order: [["id", "desc"]],
      attributes: [
        ["id", "value"],
        ["razon_social_prov", "label"],
      ],
    });
    res.status(200).json(parametros);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosporCliente = async (req, res) => {
  try {
    const parametros = await Cliente.findAll({
      where: { flag: true },
      attributes: [
        ["id_cli", "value"],
        [
          Sequelize.literal(
            "CONCAT(nombre_cli, ' ', apPaterno_cli, ' ', apMaterno_cli)"
          ),
          "label",
        ],
        "email_cli",
      ],
      // include: [
      //   {
      //     model: Venta,
      //     include: [
      //       {
      //         model: detalleVenta_membresias,
      //         attributes: [
      //           "fec_inicio_mem",
      //           "fec_fin_mem",
      //           "id_pgm",
      //           "id_st",
      //           "id_tarifa",
      //           "tarifa_monto",
      //         ],
      //         include: [
      //           {
      //             model: ProgramaTraining,
      //             attributes: ["name_pgm"],
      //           },
      //           {
      //             model: SemanasTraining,
      //             attributes: ["semanas_st"],
      //           },
      //         ],
      //         required: true,
      //       },
      //     ],
      //   },
      // ],
    });
    res.status(200).json(parametros);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosporProductosCategoria = async (
  req = request,
  res = response
) => {
  try {
    const { categoria } = req.params;
    const productos = await Producto.findAll({
      where: { id_categoria: categoria },
      attributes: [
        ["id", "value"],
        [
          Sequelize.literal("CONCAT(nombre_producto, ' | ', prec_venta)"),
          "label",
        ],
        ["nombre_producto", "nombre_producto"],
        ["prec_venta", "venta"],
        ["stock_producto", "stock"],
        ["estado_product", "estado"],
      ],
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(404).json(error);
  }
};
const postParametros = async (req = request, res = response) => {
  const { sigla, entidad } = req.params;
  const { label_param, sigla_param } = req.body;
  try {
    const parametro = new Parametros({
      grupo_param: sigla,
      entidad_param: entidad,
      label_param,
      sigla_param,
    });
    await parametro.save();
    res.status(200).json({
      msg: "success",
      parametro,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};
const getParametrosEmpleadosxDep = async (req = request, res = response) => {
  try {
    console.log("funciona");
    const { departamento } = req.params;
    const empleados = await Empleado.findAll({
      where: { departamento_empl: departamento },
      attributes: [
        ["id_empl", "value"],
        [
          Sequelize.literal(
            "CONCAT(nombre_empl, ' ', apPaterno_empl, ' ', apMaterno_empl)"
          ),
          "label",
        ],
      ],
    });
    res.status(200).json(empleados);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosLogosProgramas = async (req = request, res = response) => {
  try {
    const logosPgm = await ProgramaTraining.findAll({
      include: [
        {
          model: ImagePT,
          attributes: ["name_image"],
        },
      ],
      attributes: ["id_pgm", "estado_pgm", "name_pgm"],
    });
    res.status(200).json(logosPgm);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
const getParametroSemanaPGM = async (req = request, res = response) => {
  const { id_pgm } = req.params;
  try {
    const semanas = await SemanasTraining.findAll({
      where: { id_pgm: id_pgm, flag: true, estado_st: true },
      order: [["semanas_st", "ASC"]],
      attributes: [
        ["id_st", "value"],
        ["semanas_st", "semanas"],
        ["congelamiento_st", "cong"],
        ["nutricion_st", "nutric"],
        [
          Sequelize.literal(
            "CONCAT(semanas_st, ' Semanas', ' | ', congelamiento_st, ' dias de congelamientos', ' | ', nutricion_st, ' dias de nutricion')"
          ),
          "label",
        ],
      ],
    });
    res.status(200).json(semanas);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametroHorariosPGM = async (req, res) => {
  const { id_pgm } = req.params;
  try {
    const horarios = await HorarioProgramaPT.findAll({
      where: { id_pgm: id_pgm, flag: true, estado_HorarioPgm: true },
      attributes: [
        ["id_horarioPgm", "value"],
        [
          Sequelize.literal(
            "CONCAT(time_HorarioPgm, ' | ', 'Aforo: ', aforo_HorarioPgm)"
          ),
          "label",
        ],
        ["time_HorarioPgm", "horario"],
        ["aforo_HorarioPgm", "aforo"],
        ["trainer_HorarioPgm", "trainer"],
      ],
    });
    res.status(200).json(horarios);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametroTarifasSM = async (req = request, res = response) => {
  const { id_st } = req.params;
  try {
    const tarifas = await TarifaTraining.findAll({
      where: { id_st: id_st, flag: true, estado_tt: true },
      attributes: [
        ["id_tt", "value"],
        [
          Sequelize.literal("CONCAT(nombreTarifa_tt, ' | ', tarifaCash_tt)"),
          "label",
        ],
        ["nombreTarifa_tt", "nombre_tarifa"],
        ["tarifaCash_tt", "tarifa"],
      ],
    });
    res.status(200).json(tarifas);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametroMetaxAsesor = async (req = request, res = response) => {
  const { id_meta } = req.params;
  try {
    const asesores = await Empleado.findAll({
      where: {
        id_empl: {
          [Op.notIn]: Sequelize.literal(`(
            SELECT DISTINCT "meta_asesor" 
            FROM "tb_Meta_vs_Asesores" 
            WHERE "id_meta" = '${id_meta}'
          )`),
        },
      },
    });
    console.log(asesores);
    //En una meta, cada vez que se registre un asesor en la meta, el asesor desaparece
    //Quiero ver todo los asesoresMeta que tiene la meta para
    res.status(200).json(asesores);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosFormaPago = async (req = request, res = response) => {
  try {
    const formaPago = await FormaPago.findAll({
      include: [
        {
          model: Parametros,
          as: "FormaPagoLabel",
          attributes: ["label_param"],
        },
        {
          model: Parametros,
          as: "TipoTarjetaLabel",
          attributes: ["label_param"],
        },
        { model: Parametros, as: "TarjetaLabel", attributes: ["label_param"] },
        { model: Parametros, as: "BancoLabel", attributes: ["label_param"] },
      ],
    });
    const formaPagoConLabels = formaPago.map((item) => {
      const formaPagoLabel = item.FormaPagoLabel
        ? item.FormaPagoLabel.label_param
        : null;
      const bancoLabel = item.BancoLabel ? item.BancoLabel.label_param : null;
      const tipoTarjetaLabel = item.TipoTarjetaLabel
        ? item.TipoTarjetaLabel.label_param
        : null;
      const tarjetaLabel = item.TarjetaLabel
        ? item.TarjetaLabel.label_param
        : null;
      const formattedLabel = `${formaPagoLabel ? `${formaPagoLabel}` : ""}${
        bancoLabel ? `/${bancoLabel}` : ""
      }${tipoTarjetaLabel ? `/${tipoTarjetaLabel}` : ""}${
        tarjetaLabel ? `/${tarjetaLabel}` : ""
      }`;
      return {
        value: item.id,
        label: formattedLabel,
      };
    });
    res.status(200).json(formaPagoConLabels);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
const getParametrosFinanzas = async (req, res) => {
  try {
    const finanzas = await ParametroGastos.findAll({
      where: {
        flag: true,
      },
      attributes: ["id", "grupo", "id_tipoGasto", "nombre_gasto"],
    });
    res.status(200).json(finanzas);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametroGrupoxTIPOGASTO = async (req = request, res = response) => {
  const { id_tipo_gasto } = req.params;
  try {
    const grupos = await ParametroGastos.findAll({
      where: {
        id_tipoGasto: id_tipo_gasto,
        flag: true,
      },
      attributes: ["grupo"],
      having: Sequelize.literal("COUNT(*) = 1"),
    });
    res.status(200).json(grupos);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametroxTIPOGASTOXID = async (req = request, res = response) => {
  const { id_ } = req.params;
};
const getParametroGasto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const paramGasto = await ParametroGastos.findOne({
      where: { id },
      attributes: ["grupo", "id_tipoGasto"],
    });
    res.status(200).json({
      msg: "ok",
      paramGasto,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
const getProgramasActivos = async (req = request, res = response) => {
  try {
    const programasActivos = await ProgramaTraining.findAll({
      where: { estado_pgm: true, flag: true },
      attributes: [
        ["id_pgm", "value"],
        ["name_pgm", "label"],
      ],
    });
    res.status(200).json({
      msg: "ok",
      programasActivos,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
const getLogicaEstadoMembresia = async (req = request, res = response) => {
  const { id_cli } = req.params;
  try {
    const ultimaMembresiaPorCliente = await Venta.findOne({
      where: {
        id_cli: id_cli,
        flag: true,
      },
      order: [["fecha_venta", "DESC"]],
      include: [
        {
          model: detalleVenta_membresias,
          attributes: [
            "fec_inicio_mem",
            "fec_fin_mem",
            "id_pgm",
            "id_st",
            "id_tarifa",
            "tarifa_monto",
          ],
          include: [
            {
              model: ProgramaTraining,
              attributes: ["name_pgm"],
            },
            {
              model: SemanasTraining,
              attributes: ["semanas_st"],
            },
          ],
          required: true,
        },
      ],
    });
    res.status(200).json(ultimaMembresiaPorCliente);
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosVendedoresVendiendoTodo = async (
  req = request,
  res = response
) => {
  try {
    const filtroVendedores_ventas = await Venta.findAll({
      attributes: ["id_empl", "fecha_venta"],
      include: [
        {
          model: Empleado,
          attributes: [
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("nombre_empl"),
                " ",
                Sequelize.col("apPaterno_empl"),
                " ",
                Sequelize.col("apMaterno_empl")
              ),
              "nombres_apellidos_empl",
            ],
          ],
        },
      ],
      raw: true,
    });
    let groupedByIdEmpl = filtroVendedores_ventas.reduce((acc, venta) => {
      const { id_empl } = venta;
      if (!acc[id_empl]) {
        acc[id_empl] = [];
      }
      acc[id_empl].push(venta);
      return acc;
    }, {});

    groupedByIdEmpl = Object.keys(groupedByIdEmpl).map((id_empl) => {
      return {
        value: parseInt(id_empl),
        label:
          groupedByIdEmpl[id_empl][0]["tb_empleado.nombres_apellidos_empl"],
      };
    });
    res.status(200).json({
      msg: "ok",
      vendedores: groupedByIdEmpl,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
module.exports = {
  getParametros,
  postParametros,
  getParametrosporENTIDADyGRUPO,
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
  getParametrosporEntidad,
  getCitasDisponibleporClient,
  getParametrosFinanzas,
  getParametroGrupoxTIPOGASTO,
  getParametroxTIPOGASTOXID,
  getParametroGasto,
  getProgramasActivos,
  getLogicaEstadoMembresia,
  getParametrosVendedoresVendiendoTodo,
};
