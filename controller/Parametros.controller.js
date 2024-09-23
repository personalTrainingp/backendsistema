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
const { Cita, CitasAdquiridas } = require("../models/Cita");
const {
  detalleVenta_citas,
  Venta,
  detalleVenta_membresias,
} = require("../models/Venta");
const { Servicios } = require("../models/Servicios");
const { ParametroGastos } = require("../models/GastosFyV");
const { Inversionista } = require("../models/Aportes");
const { ExtensionMembresia } = require("../models/ExtensionMembresia");
function addBusinessDays(startDate, numberOfDays) {
  let currentDate = new Date(startDate);
  let daysAdded = 0;

  while (daysAdded < numberOfDays) {
    currentDate.setDate(currentDate.getDate() + 1);

    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Check if it's Monday to Friday
      daysAdded++;
    }
  }

  return currentDate;
}
const getParametrosTipoAportes = async (req = request, res = response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
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
    const CITASCOMPRADAS = await Venta.findAll({
      raw: true,
      where: { flag: true, id_cli: id_cli },
      attributes: ["id", "id_cli"],
      include: [
        {
          model: detalleVenta_citas,
          attributes: ["cantidad", "id"],
          required: true,
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
    console.log(tipo_serv);

    // Obtener las citas programadas desde la tabla tb_citas
    const citasYaProgramadas = await Cita.findAll({
      where: { id_cli: id_cli },
      attributes: [],
      raw: true,
    });

    // Crear un mapa para contar las citas programadas por cada detalleCita
    // Crear un mapa para contar las citas programadas por cada id_detallecita
    const citasProgramadasMap = citasYaProgramadas.reduce((acc, cita) => {
      acc[cita.id_detallecita] = (acc[cita.id_detallecita] || 0) + 1;
      return acc;
    }, {});

    // Calcular las citas disponibles
    // Calcular las citas disponibles y filtrar las que tienen cantidad <= 0
    const citasDisponibles = CITASCOMPRADAS.map((compra) => {
      const idDetalleCita = compra["detalle_ventaCitas.id"];
      const cantidadComprada = compra["detalle_ventaCitas.cantidad"];
      const cantidadProgramada = citasProgramadasMap[idDetalleCita] || 0;
      const cantidadDisponible = cantidadComprada - cantidadProgramada;

      if (cantidadDisponible > 0) {
        return {
          label: `${compra["detalle_ventaCitas.tb_servicio.nombre_servicio"]} | CANTIDAD: ${cantidadDisponible}`,
          cantidad: cantidadDisponible,
          value: idDetalleCita,
        };
      }
    }).filter((cita) => cita);
    console.log(citasDisponibles);

    res.status(200).json({ citasDisponibles });
  } catch (error) {
    console.log(error);

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
        "uid",
        ["id_cli", "value"],
        [
          Sequelize.literal(
            "CONCAT(numDoc_cli, ' | ', nombre_cli, ' ', apPaterno_cli, ' ', apMaterno_cli)"
          ),
          "label",
        ],
        "email_cli",
        "tipoCli_cli",
        "tel_cli",
        "uid",
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
    const { departamento } = req.params;
    const empleados = await Empleado.findAll({
      where: { departamento_empl: departamento, estado_empl: true, flag: true },
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
      where: { estado_pgm: true, flag: true },

      include: [
        {
          model: ImagePT,
          where: { flag: true },
          attributes: ["name_image"],
          required: true,
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
      include: [
        {
          model: Empleado,
          attributes: [
            [
              Sequelize.literal(
                "CONCAT(nombre_empl, ' ', apPaterno_empl, ' ', apMaterno_empl)"
              ),
              "empl_trainer",
            ],
          ],
        },
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
    // const formaPagoConLabels = formaPago.map((item) => {
    //   const formaPagoLabel = item.FormaPagoLabel
    //     ? item.FormaPagoLabel.label_param
    //     : null;
    //   const bancoLabel = item.BancoLabel ? item.BancoLabel.label_param : null;
    //   const tipoTarjetaLabel = item.TipoTarjetaLabel
    //     ? item.TipoTarjetaLabel.label_param
    //     : null;
    //   const tarjetaLabel = item.TarjetaLabel
    //     ? item.TarjetaLabel.label_param
    //     : null;
    //   const formattedLabel = `FORMA DE PAGO: ${
    //     formaPagoLabel ? `${formaPagoLabel}` : ""
    //   }${bancoLabel ? ` | BANCO: ${bancoLabel} ` : ""}${
    //     tipoTarjetaLabel ? `| ${tipoTarjetaLabel}` : ""
    //   }${tarjetaLabel ? ` - ${tarjetaLabel}` : ""}`;
    //   return {
    //     value: item.id,
    //     label: formattedLabel,
    //   };
    // });
    res.status(200).json({
      formaPago,
    });
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
      attributes: ["id", "id_empresa", "grupo", "id_tipoGasto", "nombre_gasto"],
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
    let membresias = await detalleVenta_membresias.findAll({
      attributes: ["id", "fec_inicio_mem", "fec_fin_mem"],
      // limit: 20,
      order: [["id", "DESC"]],
      include: [
        {
          model: ExtensionMembresia,
          attributes: [
            "tipo_extension",
            "extension_inicio",
            "extension_fin",
            "dias_habiles",
          ],
        },
        {
          model: Venta,
          attributes: ["id", "fecha_venta"],
          raw: true,
          include: [
            {
              model: Cliente,
              where: { uid: id_cli },
              attributes: [
                "id_cli",
                "uid",
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("nombre_cli"),
                    " ",
                    Sequelize.col("apPaterno_cli"),
                    " ",
                    Sequelize.col("apMaterno_cli")
                  ),
                  "nombres_apellidos_cli",
                ],
                "email_cli",
              ],
            },
          ],
        },
        {
          model: ProgramaTraining,
          attributes: ["id_pgm", "name_pgm"],
          include: [
            {
              model: ImagePT,
              attributes: ["name_image", "id"],
            },
          ],
        },
        {
          model: SemanasTraining,
          attributes: ["id_st", "semanas_st"],
        },
      ],
    });
    const currentDate = new Date();
    let newMembresias = membresias
      .map((item) => {
        const itemJSON = item.toJSON();
        const tbExtensionMembresia = itemJSON.tb_extension_membresia || [];

        if (tbExtensionMembresia.length === 0) {
          // Si tb_extension_membresia está vacío
          return {
            ...itemJSON,
            dias: 0,
            // diasPorTerminar: diasLaborables(
            //   new Date(),
            //   new Date(itemJSON.fec_fin_mem)
            // ),
            fec_fin_mem_new: itemJSON.fec_fin_mem, // La nueva fecha es igual a fec_fin_mem
          };
        }
        const totalDiasHabiles = (itemJSON.tb_extension_membresia || []).reduce(
          (total, ext) => total + parseInt(ext.dias_habiles, 10),
          0
        );

        // Calcular la nueva fecha sumando los días hábiles a 'fec_fin_mem'
        const fecFinMem = new Date(itemJSON.fec_fin_mem);
        const fecFinMemNew = addBusinessDays(fecFinMem, totalDiasHabiles);

        return {
          dias: totalDiasHabiles,
          // diasPorTerminar: diasLaborables(new Date(), fecFinMemNew.toISOString()),
          fec_fin_mem_new: fecFinMemNew.toISOString(), // Ajusta el formato según tus necesidades
          ...itemJSON,
        };
      })
      .filter((item) => {
        if (item.tb_ventum) {
          return item.tb_ventum?.tb_cliente?.uid === id_cli;
        }
      });
    console.log(newMembresias);

    res.status(200).json({
      membresias: [newMembresias[0]],
    });
  } catch (error) {
    console.log(error);
    res.status(505).json({
      error: error,
    });
  }
};
const getParametrosVendedoresVendiendoTodo = async (
  req = request,
  res = response
) => {
  try {
    const filtroVendedores_ventas = await Venta.findAll({
      attributes: ["id_empl", "fecha_venta"],
      where: { flag: true },
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
const getParametrosInversionistasRegistrados = async (
  req = request,
  res = response
) => {
  try {
    const inversionistas = await Inversionista.findAll({
      attributes: [
        ["id", "value"],
        ["nombres_completos", "label"],
      ],
    });
    res.status(200).json({
      msg: "ok",
      inversionistas,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
const getParametrosColaboradoresRegistrados = async (
  req = request,
  res = response
) => {
  try {
    const colaboradores = await Empleado.findAll({
      attributes: [
        ["id_empl", "value"],
        [
          Sequelize.literal(
            "CONCAT(nombre_empl, ' ', apPaterno_empl, ' ', apMaterno_empl)"
          ),
          "label",
        ],
      ],
      where: {
        estado_empl: true,
        flag: true,
      },
    });
    res.status(200).json({
      msg: "ok",
      colaboradores,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
const getCitasServicioxCliente = async (req = request, res = response) => {
  try {
    const { id_cli } = req.params;
    const { fecha_param } = req.query;
    const citasAdquiridasxMembresia = await CitasAdquiridas.findAll({
      where: { id_cli },
      attributes: ["id"],
      raw: true,
      include: [
        {
          model: Cliente,
          attributes: [],
        },
        {
          model: detalleVenta_membresias,
          attributes: [],
          required: true,
          include: [
            {
              model: SemanasTraining,
              attributes: [
                ["nutricion_st", "citas_cantidad"],
                [
                  Sequelize.fn(
                    "CONCAT",
                    "CITA POR MEMBRESIA: ",
                    Sequelize.col("nutricion_st")
                  ),
                  "cita_label",
                ],
              ],
            },
          ],
        },
      ],
    });
    const citasAdquiridasxVentas = await CitasAdquiridas.findAll({
      where: { id_cli },
      attributes: ["id"],
      raw: true,
      include: [
        {
          model: Cliente,
          attributes: [],
        },
        {
          model: detalleVenta_citas,
          attributes: [
            ["cantidad", "citas_cantidad"],
            [
              Sequelize.fn(
                "CONCAT",
                "CITA POR VENTA: ",
                Sequelize.col("cantidad")
              ),
              "cita_label",
            ],
          ],
          required: true,
        },
      ],
    });
    const EventoCita = await Cita.findAll({
      where: { id_cli },
      raw: true,
      include: [
        {
          model: CitasAdquiridas,
          attributes: [],
        },
      ],
    });

    res.status(200).json({
      msg: "ok",
      // adquiridasCitas: [
      //   ...citasAdquiridasxMembresia,
      //   ...citasAdquiridasxVentas,
      // ],
      // EventoCita,
      citasDisponibles: calcularCitasDisponibles(
        [...citasAdquiridasxMembresia, ...citasAdquiridasxVentas],
        EventoCita,
        fecha_param
      ),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
const getParametrosVentaFitology = async (req = request, res = response) => {
  const { tipo_serv } = req.params;
  try {
    const fitology = await Servicios.findAll({
      where: { flag: true, tipo_servicio: tipo_serv },
      attributes: [
        [
          Sequelize.literal(
            "CONCAT(nombre_servicio, ' | CANTIDAD: ', cantidad_servicio, ' | TARIFA: ', tarifa_servicio)"
          ),
          "label",
        ],
        ["id", "value"],
      ],
    });
    res.status(200).json({
      msg: "ok",
      fitology,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const calcularCitasDisponibles = (
  citasAdquiridas,
  citasUsadas,
  fecha_param
) => {
  // Crear un mapa de citas usadas por ID de cita adquirida y filtrarlas por la fecha_param
  const citasUsadasMap = citasUsadas.reduce((map, citaUsada) => {
    const idCitaAdquirida = citaUsada.id_cita_adquirida;

    // Contabilizar solo las citas usadas que son anteriores a fecha_param
    if (new Date(citaUsada.fecha_init) < new Date(fecha_param)) {
      map[idCitaAdquirida] = (map[idCitaAdquirida] || 0) + 1; // Sumar 1 por cada cita usada
    }
    return map;
  }, {});

  // Calcular las citas disponibles restando las usadas
  const citasDisponibles = citasAdquiridas.map((cita) => {
    const id = cita.id;

    // Determinar la cantidad de citas según el tipo de venta (membresía o venta de citas)
    const citasCantidad =
      cita["detalle_ventaMembresium.tb_semana_training.citas_cantidad"] ||
      parseInt(cita["detalle_ventaCita.citas_cantidad"] || 0, 10);

    const citasUsadas = citasUsadasMap[id] || 0; // Cantidad de citas usadas para esta cita adquirida

    // Restar citas usadas
    const citasRestantes = citasCantidad - citasUsadas;

    // Si quedan citas disponibles, devolver el objeto actualizado
    if (citasRestantes > 0) {
      return {
        id: cita.id, // ID de la cita adquirida
        label_membresia:
          cita["detalle_ventaMembresium.tb_semana_training.cita_label"],
        label_venta_cita: cita["detalle_ventaCita.cita_label"],
        citas_disponibles: citasRestantes, // Cantidad de citas restantes
      };
    }

    // Si no quedan citas disponibles, no incluir este objeto
    return null;
  });

  // Filtrar las citas con más de 0 citas disponibles
  return citasDisponibles.filter((cita) => cita !== null);
};
module.exports = {
  getParametrosVentaFitology,
  getParametrosTipoAportes,
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
  getParametrosInversionistasRegistrados,
  getParametrosColaboradoresRegistrados,
  getCitasServicioxCliente,
};
