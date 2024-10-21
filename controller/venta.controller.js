const { response, request } = require("express");
const { generatePDFcontrato } = require("../config/pdfKit");
const {
  Venta,
  detalleVenta_producto,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_pagoVenta,
  detalleVenta_Transferencia,
} = require("../models/Venta");
const { Cliente, Empleado } = require("../models/Usuarios");
const { Sequelize, Op } = require("sequelize");
const { Producto } = require("../models/Producto");
const {
  ProgramaTraining,
  SemanasTraining,
  TarifaTraining,
} = require("../models/ProgramaTraining");
const { HorarioProgramaPT } = require("../models/HorarioProgramaPT");
const { Parametros } = require("../models/Parametros");
const { v4 } = require("uuid");
const { typesCRUD } = require("../types/types");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { Servicios } = require("../models/Servicios");
const fs = require("fs");
const fontkit = require("fontkit");
const path = require("path");
const { Client_Contrato } = require("../helpers/pdf/Client_Contrato");
const dayjs = require("dayjs");
const transporterU = require("../config/nodemailer");
const { mailMembresiaSTRING } = require("../middlewares/mails");
const { error } = require("console");
const { Result } = require("express-validator");
require("dotenv").config();
const env = process.env;

const { detalleVenta_transferenciasMembresias } = require("../models/Venta");
const { CLIENT_RENEG_LIMIT } = require("tls");
const { ImagePT } = require("../models/Image");

const estadosClienteMembresiaVar = async (req = request, res = response) => {
  //const {tipoPrograma , fechaDesde, fechaHasta} = req.body;
  const { tipoPrograma, fechaDesde, fechaHasta } = req.body;
  try {
    const respuesta = await estadosClienteMembresia(
      tipoPrograma,
      fechaDesde,
      fechaHasta
    );
    res.status(200).json({
      ok: true,
      msg: respuesta,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor" + error,
    });
  }
};
async function estadosClienteMembresia(
  tipoPrograma,
  fechaDesdeStr,
  fechaHastaStr
) {
  let fechaDesde = new Date(fechaDesdeStr);
  let fechaHasta = new Date(fechaHastaStr);

  const VentasEntreFechaParaIds = await Venta.findAll({
    where: {
      fecha_venta: { [Op.between]: [fechaDesde, fechaHasta] },
      flag: true,
    },
    order: [["fecha_venta", "Desc"]],
  });
  let idsClientes = [];

  await Promise.all(
    VentasEntreFechaParaIds.map(async (venta) => {
      if (idsClientes.includes(venta.id_cli)) {
      } else {
        idsClientes.push(venta.id_cli);
      }
    })
  );

  let contadorClienteNuevo = 0;
  let contadorClienteRenovado = 0;
  let contadorClienteReinscrito = 0;
  let ClientesAnalizados = [];
  let ClientesAnalizadosEntreFechas = [];

  await Promise.all(
    idsClientes.map(async (idCliente) => {
      const ventasGeneralPorId = await Venta.findAll({
        limit: 2,
        where: {
          id_cli: idCliente,
          //fecha_venta: { [Op.between]: [fechaDesde, fechaHasta] },
          flag: true,
        },
        order: [["fecha_venta", "Desc"]],
      });

      let count = 0;
      let tipoCliente = "";

      let fechaUltimaMembresiaComprada;
      let fechaPenultimaMembresia;
      let fechaVentaUltimaMembresia;
      let fechaVentaPenUltimaMembresia;

      await Promise.all(
        ventasGeneralPorId.map(async (ventaPorIdCliente) => {
          const venta = await Venta.findOne({
            attributes: [
              "id",
              "id_cli",
              "id_empl",
              "id_origen",
              "id_tipoFactura",
              "numero_transac",
              "fecha_venta",
              "observacion",
            ],
            where: { id: ventaPorIdCliente.id, flag: true },
            order: [["id", "DESC"]],
            include: [
              {
                model: Cliente,
                attributes: [
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
                ],
              },
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
              {
                model: detalleVenta_producto,
                attributes: [
                  "id_venta",
                  "id_producto",
                  "cantidad",
                  "precio_unitario",
                  "tarifa_monto",
                ],
                include: [
                  {
                    model: Producto,
                    attributes: ["id", "nombre_producto", "id_categoria"],
                  },
                ],
              },
              {
                model: detalleVenta_membresias,
                required: true,
                attributes: [
                  "id_venta",
                  "id_pgm",
                  "id_tarifa",
                  "id_st",
                  "tarifa_monto",
                  "fec_inicio_mem",
                  "fec_fin_mem",
                  "uid_firma",
                  "horario",
                ],

                include: [
                  {
                    model: ProgramaTraining,
                    attributes: ["name_pgm"],
                  },
                  {
                    model: SemanasTraining,
                    attributes: [
                      "semanas_st",
                      "congelamiento_st",
                      "nutricion_st",
                    ],
                  },
                ],
              },
              {
                model: detalleVenta_citas,
                attributes: ["id_venta", "id_servicio", "tarifa_monto"],
              },
              {
                model: detalleVenta_Transferencia,
                attributes: [
                  "id_venta",
                  "id_membresia",
                  "tarifa_monto",
                  "horario",
                  "fec_inicio_mem",
                  "fec_fin_mem",
                ],
                include: [
                  {
                    model: Venta,
                    as: "venta_transferencia",
                    include: [
                      {
                        model: detalleVenta_membresias,
                        include: [
                          {
                            model: ProgramaTraining,
                            attributes: ["name_pgm"],
                          },
                          {
                            model: SemanasTraining,
                            attributes: [
                              "semanas_st",
                              "congelamiento_st",
                              "nutricion_st",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                model: detalleVenta_pagoVenta,
                attributes: [
                  "fecha_pago",
                  "id_forma_pago",
                  "id_tipo_tarjeta",
                  "id_tarjeta",
                  "id_banco",
                  "parcial_monto",
                  "n_operacion",
                  "observacion",
                ],
                include: [
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_banco",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_forma_pago",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_tipo_tarjeta",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_tarjeta",
                  },
                ],
              },
            ],
          });

          let detalleMembresia;

          if (venta) {
            if (tipoPrograma == 0) {
              detalleMembresia = await detalleVenta_membresias.findOne({
                where: {
                  id_venta: venta.id,
                  flag: true,
                },
              });
            } else {
              detalleMembresia = await detalleVenta_membresias.findOne({
                where: {
                  id_venta: venta.id,
                  id_pgm: tipoPrograma,
                  flag: true,
                },
              });
            }

            let detalleVenta_transferencias =
              await detalleVenta_Transferencia.findOne({
                where: {
                  id_venta: venta.id,
                  flag: true,
                },
              });
            let detalleMembresia2;

            if (detalleVenta_transferencias) {
              if (tipoPrograma == 0) {
                detalleMembresia2 = await detalleVenta_membresias.findOne({
                  where: {
                    id_venta: detalleVenta_transferencias.id_membresia,
                    flag: true,
                  },
                });
              } else {
                detalleMembresia2 = await detalleVenta_membresias.findOne({
                  where: {
                    id_venta: detalleVenta_transferencias.id_membresia,
                    id_pgm: tipoPrograma,
                    flag: true,
                  },
                });
              }
            }

            if (detalleMembresia || detalleMembresia2) {
              count++;

              if (count == 1) {
                if (detalleMembresia) {
                  //console.log(detalleMembresia.toJSON());
                  fechaUltimaMembresiaComprada = new Date(
                    detalleMembresia.fec_fin_mem
                  ).toISOString();
                  fechaVentaUltimaMembresia = new Date(
                    venta.fecha_venta
                  ).toISOString();
                }

                if (detalleMembresia2) {
                  let fechaTransferenciaFin_mem = new Date(
                    detalleMembresia2.fec_fin_mem
                  ).toISOString();
                  if (
                    fechaTransferenciaFin_mem > fechaUltimaMembresiaComprada ||
                    !fechaUltimaMembresiaComprada
                  ) {
                    fechaUltimaMembresiaComprada = fechaTransferenciaFin_mem;
                  }
                }
              }

              if (count == 2) {
                fechaPenultimaMembresia = new Date(
                  detalleMembresia.fec_fin_mem
                ).toISOString();
                fechaVentaPenUltimaMembresia = new Date(
                  venta.fecha_venta
                ).toISOString();

                if (detalleMembresia2) {
                  let fechaTransferenciaFin_mem = new Date(
                    detalleMembresia2.fec_fin_mem
                  ).toISOString();
                  if (
                    fechaTransferenciaFin_mem > fechaPenultimaMembresia ||
                    !fechaPenultimaMembresia
                  ) {
                    fechaPenultimaMembresia = fechaTransferenciaFin_mem;
                  }
                }
              }
            }
          }
        })
      );

      if (count == 1) {
        tipoCliente = "Cliente Nuevo";
      } else if (count == 2) {
        if (fechaVentaUltimaMembresia < fechaPenultimaMembresia) {
          tipoCliente = "Cliente reinscrito";
        }
        if ((fechaVentaUltimaMembresia) => fechaPenultimaMembresia) {
          tipoCliente = "Cliente renovado";
        }
      }

      if (count > 0) {
        if (!ClientesAnalizados.includes({ tipoCliente, idCliente })) {
          ClientesAnalizados.push({ tipoCliente, idCliente });
        }
      }
    })
  );

  await Promise.all(
    ClientesAnalizados.map(async (cliente) => {
      let VentasEntreFechas = await Venta.findAll({
        where: {
          id_cli: cliente.idCliente,
          fecha_venta: { [Op.between]: [fechaDesde, fechaHasta] },
          flag: true,
        },
        order: [["fecha_venta", "Desc"]],
        //limit:1,
      });
      await Promise.all(
        VentasEntreFechas.map(async (ventaEntreFecha) => {
          const venta = await Venta.findOne({
            attributes: [
              "id",
              "id_cli",
              "id_empl",
              "id_origen",
              "id_tipoFactura",
              "numero_transac",
              "fecha_venta",
              "observacion",
            ],
            where: { id: ventaEntreFecha.id, flag: true },
            order: [["id", "DESC"]],
            include: [
              {
                model: Cliente,
                attributes: [
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
                ],
              },
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
              {
                model: detalleVenta_producto,
                attributes: [
                  "id_venta",
                  "id_producto",
                  "cantidad",
                  "precio_unitario",
                  "tarifa_monto",
                ],
                include: [
                  {
                    model: Producto,
                    attributes: ["id", "nombre_producto", "id_categoria"],
                  },
                ],
              },
              {
                model: detalleVenta_membresias,
                required: true,
                attributes: [
                  "id_venta",
                  "id_pgm",
                  "id_tarifa",
                  "id_st",
                  "tarifa_monto",
                  "fec_inicio_mem",
                  "fec_fin_mem",
                  "uid_firma",
                  "horario",
                ],

                include: [
                  {
                    model: ProgramaTraining,
                    attributes: ["name_pgm"],
                  },
                  {
                    model: SemanasTraining,
                    attributes: [
                      "semanas_st",
                      "congelamiento_st",
                      "nutricion_st",
                    ],
                  },
                ],
              },
              {
                model: detalleVenta_citas,
                attributes: ["id_venta", "id_servicio", "tarifa_monto"],
              },
              {
                model: detalleVenta_Transferencia,
                attributes: [
                  "id_venta",
                  "id_membresia",
                  "tarifa_monto",
                  "horario",
                  "fec_inicio_mem",
                  "fec_fin_mem",
                ],
                include: [
                  {
                    model: Venta,
                    as: "venta_transferencia",
                    include: [
                      {
                        model: detalleVenta_membresias,
                        include: [
                          {
                            model: ProgramaTraining,
                            attributes: ["name_pgm"],
                          },
                          {
                            model: SemanasTraining,
                            attributes: [
                              "semanas_st",
                              "congelamiento_st",
                              "nutricion_st",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                model: detalleVenta_pagoVenta,
                attributes: [
                  "fecha_pago",
                  "id_forma_pago",
                  "id_tipo_tarjeta",
                  "id_tarjeta",
                  "id_banco",
                  "parcial_monto",
                  "n_operacion",
                  "observacion",
                ],
                include: [
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_banco",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_forma_pago",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_tipo_tarjeta",
                  },
                  {
                    model: Parametros,
                    attributes: ["id_param", "label_param"],
                    as: "parametro_tarjeta",
                  },
                ],
              },
            ],
          });

          let detalleMembresia;
          let detalleMembresia2;

          if (venta) {
            //console.log(venta.toJSON());
            if (tipoPrograma == 0) {
              detalleMembresia = await detalleVenta_membresias.findOne({
                where: {
                  id_venta: venta.id,
                  flag: true,
                },
              });
            } else {
              detalleMembresia = await detalleVenta_membresias.findOne({
                where: {
                  id_venta: venta.id,
                  id_pgm: tipoPrograma,
                  flag: true,
                },
              });
            }

            let detalleVenta_transferencias_entreFechas =
              await detalleVenta_Transferencia.findOne({
                where: {
                  id_venta: venta.id,
                  flag: true,
                  //fecha_venta: { [Op.between]: [fechaDesde, fechaHasta] },
                },
                //order: [['fecha_venta', 'Desc']],
              });

            if (detalleVenta_transferencias_entreFechas) {
              if (tipoPrograma == 0) {
                detalleMembresia2 = await detalleVenta_membresias.findOne({
                  where: {
                    id_venta:
                      detalleVenta_transferencias_entreFechas.id_membresia,
                    flag: true,
                  },
                });
              } else {
                detalleMembresia2 = await detalleVenta_membresias.findOne({
                  where: {
                    id_venta:
                      detalleVenta_transferencias_entreFechas.id_membresia,
                    id_pgm: tipoPrograma,
                    flag: true,
                  },
                });
              }
            }
          }

          if (detalleMembresia || detalleMembresia2) {
            if (!ClientesAnalizadosEntreFechas.includes(cliente)) {
              switch (cliente.tipoCliente) {
                case "Cliente Nuevo":
                  contadorClienteNuevo++;
                  break;
                case "Cliente reinscrito":
                  contadorClienteReinscrito++;
                  break;
                case "Cliente renovado":
                  contadorClienteRenovado++;
                  break;
              }

              ClientesAnalizadosEntreFechas.push(cliente);
            }
          }
        })
      );
    })
  );

  let ClientesNuevoEntreFechas = ClientesAnalizadosEntreFechas.filter(
    (cliente) => {
      return cliente.tipoCliente == "Cliente Nuevo";
    }
  );

  respuesta = {
    CantidadPorEstado: {
      ClienteNuevo: contadorClienteNuevo,
      ClienteReinscrito: contadorClienteReinscrito,
      ClienteRenovado: contadorClienteRenovado,
    },
    ClientesNuevoEntreFechas: { ClientesNuevoEntreFechas },
    //ClientesAnalizadosTotal:ClientesAnalizados
  };

  return respuesta;
}

const comparativaPorProgramaApi = async (req = request, res = response) => {
  const { fecha } = req.params;
  //const {tipoPrograma , fechaDesde, fechaHasta} = req.body;
  try {
    let fechaDate = new Date(fecha);
    let nroMesActual = fechaDate.getMonth();
    let NroMesAnterior = nroMesActual - 1;

    const respuesta1 = await comparativaPorPrograma(
      new Date(fechaDate.getFullYear(), nroMesActual, 1)
    );
    //const respuesta2  = await comparativaPorPrograma(new Date (fechaDate.getFullYear() , NroMesAnterior , 1));
    //const respuesta3  = await comparativaPorPrograma(fecha);

    const resultado = {
      mesActual: respuesta1,
      //mesAnterior : respuesta2
    };

    res.status(200).json({
      ok: true,
      msg: resultado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor" + error,
    });
  }
};

async function comparativaPorPrograma(fecha) {
  let resultado = {};
  let fechaDate = new Date(fecha);
  let nroMes = fechaDate.getMonth();

  let primerDiaMesActual = new Date(fechaDate.getFullYear(), nroMes, 1);
  let ultimoDiaMesActual = new Date(fechaDate.getFullYear(), nroMes + 1, 0);

  let ventasMesActual = await Venta.findAll({
    where: {
      fecha_venta: { [Op.between]: [primerDiaMesActual, ultimoDiaMesActual] },
    },
  });

  await Promise.all(
    ventasMesActual.map(async (venta) => {
      let detalleMembresia = await detalleVenta_membresias.findOne({
        where: {
          id_venta: venta.id,
        },
      });

      if (detalleMembresia) {
        let programaTraining = await ProgramaTraining.findOne({
          where: {
            id_pgm: detalleMembresia.id_pgm,
          },
        });

        if (!resultado[programaTraining.name_pgm]) {
          resultado[programaTraining.name_pgm] = {
            cantidad: 1,
            monto: detalleMembresia.tarifa_monto,
            tikectMedio: 0,
          };
        }

        if (resultado[programaTraining.name_pgm]) {
          resultado[programaTraining.name_pgm].cantidad += 1;
          resultado[programaTraining.name_pgm].monto +=
            detalleMembresia.tarifa_monto;
        }

        //resultado[programaTraining.name_pgm] = ( resultado[programaTraining.name_pgm] || 0 ) + 1;
        //programaTraining.name_pgm;
      }
    })
  );

  for (programa in resultado) {
    let tikectMedio = resultado[programa].monto / resultado[programa].cantidad;
    resultado[programa].tikectMedio = tikectMedio.toFixed(2);
  }

  return resultado;
}

function calcularEdad(fecha_nac) {
  const hoy = dayjs();
  const fechaNacimiento = dayjs(fecha_nac);
  const edad = hoy.diff(fechaNacimiento, "year");
  return edad;
}
function formatearNumero(numero) {
  return numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const postVenta = async (req = request, res = response) => {
  // const { uid_firma, uid_contrato } = req.query;
  const uid_firma = v4();
  const uid_contrato = v4();
  let base64_contratoPDF = "";
  try {
    if (req.productos && req.productos.length > 0) {
      const ventasProductosConIdVenta = await req.productos.map((producto) => ({
        id_producto: producto.id_producto,
        cantidad: producto.cantidad,
        precio_unitario: producto.precio_unitario,
        tarifa_monto: producto.tarifa,
        id_venta: req.ventaID,
      }));
      // Crear múltiples registros en detalleVenta_producto
      await detalleVenta_producto.bulkCreate(ventasProductosConIdVenta);
    }
    if (req.ventaProgramas && req.ventaProgramas.length > 0) {
      // Crear múltiples registros en detalleVenta_producto
      const { dataVenta, detalle_cli_modelo } = req.body;

      const pdfContrato = await getPDF_CONTRATO(
        dataVenta.detalle_venta_programa[0],
        detalle_cli_modelo
      );

      base64_contratoPDF = `data:application/pdf;base64,${Buffer.from(
        pdfContrato
      ).toString("base64")}`;

      const ventasMembresiasConIdVenta = await req.ventaProgramas.map(
        (mem) => ({
          id_venta: req.ventaID,
          uid_firma: uid_firma,
          uid_contrato: uid_contrato,
          ...mem,
        })
      );

      await detalleVenta_membresias.bulkCreate(ventasMembresiasConIdVenta);
    }
    if (req.citas && req.citas.length > 0) {
      const ventasCitasConIdVenta = await req.citas.map((cita) => ({
        id_venta: req.ventaID,
        id_cita: cita.value,
        cantidad: cita.cantidad,
        tarifa_monto: cita.tarifa,
      }));
      await detalleVenta_citas.bulkCreate(ventasCitasConIdVenta);
    }
    if (req.ventaTransferencia && req.ventaTransferencia.length > 0) {
      const ventasTransferenciaConIdVenta = await req.ventaTransferencia.map(
        (transferencia) => ({
          id_venta: req.ventaID,
          ...transferencia,
        })
      );
      await detalleVenta_Transferencia.bulkCreate(
        ventasTransferenciaConIdVenta
      );
    }
    if (req.pagosExtraidos && req.pagosExtraidos.length > 0) {
      const pagosVentasConIdVenta = await req.pagosExtraidos.map((pagos) => ({
        id_venta: req.ventaID,
        ...pagos,
      }));
      await detalleVenta_pagoVenta.bulkCreate(pagosVentasConIdVenta);
    }
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.POST,
      observacion: `Se agrego: La venta de id ${req.ventaID}`,
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: `Venta creada con exito`,
      uid_firma,
      uid_contrato,
      base64_contratoPDF: base64_contratoPDF,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de postVenta, hable con el administrador: ${error}`,
    });
  }
};
const obtener_contrato_pdf = async (req = request, res = response) => {
  try {
    const { dataVenta, detalle_cli_modelo } = req.body;

    const pdfContrato = await getPDF_CONTRATO(dataVenta, detalle_cli_modelo);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=CONTRATO-CLIENTE.pdf"
    );
    res.send(Buffer.from(pdfContrato));
  } catch (error) {
    console.log(error);
  }
};
const getPDF_CONTRATO = async (detalle_membresia, dataVenta) => {
  const {
    semanas,
    firmaCli,
    nutric,
    cong,
    time_h,
    id_pgm,
    name_pgm,
    fechaInicio_programa,
    fechaFinal,
    tarifa,
  } = detalle_membresia;
  console.log("en getPDF CONTRATO");

  const fecha_Venta = new Date();
  const { id_empl, id_cli } = dataVenta;
  const data_cliente = await Cliente.findOne({
    where: { flag: true, id_cli: id_cli },
  });
  const data_empl = await Empleado.findOne({
    where: { flag: true, id_empl: id_empl },
  });
  // const data_tarifa = await TarifaTraining.findOne({
  //   where: { flag: true, tarifaCash_tt: tarifa },
  // });
  const dataInfo = {
    nombresCliente: data_cliente.nombre_cli,
    apPaternoCliente: data_cliente.apPaterno_cli,
    apMaternoCliente: data_cliente.apMaterno_cli,
    dni: `${data_cliente.numDoc_cli}`,
    DireccionCliente: data_cliente.direccion_cli,
    PaisCliente: "Peru",
    CargoCliente: data_cliente.cargo_cli,
    EmailCliente: data_cliente.email_cli,
    EdadCliente: `${calcularEdad(data_cliente.fecNac_cli)}`,
    DistritoCliente: "Barranco",
    FechaDeNacimientoCliente: `${dayjs(data_cliente.fecNac_cli).format(
      "DD/MM/YYYY"
    )}`,
    CentroDeTrabajoCliente: data_cliente.trabajo_cli,
    origenCliente: "Facebook",
    sede: "Miraflores",
    nContrato: "---",
    codigoSocio: `---`,
    fecha_venta: `${dayjs(fecha_Venta).format("DD/MM/YYYY")}`,
    hora_venta: `${dayjs(fecha_Venta).format("hh:mm:ss A")}`,
    //datos de membresia
    id_pgm: `${id_pgm}`,
    Programa: name_pgm,
    fec_inicio: fechaInicio_programa,
    fec_fin: fechaFinal,
    horario: time_h,
    semanas: semanas,
    dias_cong: `${cong}`,
    sesiones_nutricion: `${nutric}`,
    asesor: `${data_empl.nombre_empl.split(" ")[0]}`,
    forma_pago: [
      "Tarj. de credito Bbva",
      "yape",
      "plin",
      "transferencia bancaria",
    ],
    monto: `S/. ${0}`,
    //Firma
    firma_cli: firmaCli,
  };

  const pdfContrato = await Client_Contrato(dataInfo);

  // Enviar el PDF como respuesta
  return pdfContrato;
};
const get_VENTAS = async (req = request, res = response) => {
  try {
    const ventas = await Venta.findAll({
      where: { flag: true },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: Cliente,
          attributes: [
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
          ],
        },
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
        {
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
        },
        {
          model: detalleVenta_membresias,
          attributes: [
            "id_venta",
            "id_pgm",
            "id_tarifa",
            "horario",
            "id_st",
            "tarifa_monto",
          ],
        },
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "id_servicio", "tarifa_monto"],
        },
        {
          model: detalleVenta_pagoVenta,
          attributes: ["id_venta", "parcial_monto"],
        },
      ],
    });
    res.status(200).json({
      ok: true,
      ventas,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de get_VENTAS, hable con el administrador: ${error}`,
    });
  }
};
const get_VENTA_ID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findAll({
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_origen",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
        "observacion",
      ],
      where: { id: id, flag: true },
      order: [["id", "DESC"]],
      include: [
        {
          model: Cliente,
          attributes: [
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
          ],
        },
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
        {
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          include: [
            {
              model: Producto,
              attributes: ["id", "nombre_producto", "id_categoria"],
            },
          ],
        },
        {
          model: detalleVenta_membresias,
          attributes: [
            "uid_contrato",
            "id_venta",
            "id_pgm",
            "id_tarifa",
            "id_st",
            "tarifa_monto",
            "fec_inicio_mem",
            "fec_fin_mem",
            "uid_firma",
            "horario",
          ],
          include: [
            {
              model: ProgramaTraining,
              attributes: ["name_pgm"],
            },
            {
              model: SemanasTraining,
              attributes: ["semanas_st", "congelamiento_st", "nutricion_st"],
            },
            {
              model: ImagePT,
              as: "contrato_x_serv",
              attributes: ["name_image"],
            },
          ],
        },
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "id_servicio", "tarifa_monto"],
        },
        {
          model: detalleVenta_Transferencia,
          attributes: [
            "id_venta",
            "id_membresia",
            "tarifa_monto",
            "horario",
            "fec_inicio_mem",
            "fec_fin_mem",
          ],
          include: [
            {
              model: Venta,
              as: "venta_transferencia",
              include: [
                {
                  model: detalleVenta_membresias,
                  include: [
                    {
                      model: ProgramaTraining,
                      attributes: ["name_pgm"],
                    },
                    {
                      model: SemanasTraining,
                      attributes: [
                        "semanas_st",
                        "congelamiento_st",
                        "nutricion_st",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: detalleVenta_pagoVenta,
          attributes: [
            "fecha_pago",
            "id_forma_pago",
            "id_tipo_tarjeta",
            "id_tarjeta",
            "id_banco",
            "parcial_monto",
            "n_operacion",
            "observacion",
          ],
          include: [
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_banco",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_forma_pago",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_tipo_tarjeta",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_tarjeta",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      ok: true,
      venta,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de get_VENTAS, hable con el administrador: ${error}`,
    });
  }
};
const getVentasxFecha = async (req = request, res = response) => {
  const { arrayDate } = req.query;
  try {
    const ventas = await Venta.findAll({
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "flag",
        "fecha_venta",
      ],
      where: {
        fecha_venta: {
          [Op.between]: [arrayDate[0], arrayDate[1]],
        },
        flag: true,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Cliente,
          attributes: [
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
          ],
        },
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
        {
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          include: [
            {
              model: Producto,
              attributes: ["id", "id_categoria"],
            },
          ],
        },
        {
          model: detalleVenta_membresias,
          attributes: [
            "id_venta",
            "id_pgm",
            "id_tarifa",
            "horario",
            "id_st",
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
        },
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "id_servicio", "tarifa_monto"],
          include: [
            {
              model: Servicios,
              attributes: ["id", "nombre_servicio", "tipo_servicio"],
            },
          ],
        },
        {
          model: detalleVenta_pagoVenta,
          attributes: ["id_venta", "parcial_monto"],
          include: [
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_banco",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_forma_pago",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_tipo_tarjeta",
            },
            {
              model: Parametros,
              attributes: ["id_param", "label_param"],
              as: "parametro_tarjeta",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      ok: true,
      ventas,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de get_VENTAS, hable con el administrador: ${error}`,
    });
  }
};

const mailMembresia = async (req = request, res = response) => {
  const { id_venta } = req.params;
  const { firma_base64 } = req.body;
  const venta = await Venta.findOne({ where: { id: id_venta } });
  const detalleMembresia = await detalleVenta_membresias.findOne({
    where: { id_venta: id_venta },
  });
  const detalle_semana = await SemanasTraining.findOne({
    where: { id_st: detalleMembresia.id_st },
  });
  const detalle_programa = await ProgramaTraining.findOne({
    where: { id_pgm: detalleMembresia.id_pgm },
  });

  const detalle_membresia = {
    semanas: detalle_semana.semanas_st,
    firmaCli: firma_base64,
    nutric: detalle_semana.nutricion_st,
    cong: detalle_semana.congelamiento_st,
    time_h: detalleMembresia.horario,
    id_pgm: detalleMembresia.id_pgm,
    name_pgm: detalle_programa.name_pgm,
    fechaInicio_programa: `${new Date(detalleMembresia.fec_inicio_mem)}`,
    fechaFinal: `${new Date(detalleMembresia.fec_fin_mem)}`,
    tarifa: detalleMembresia.tarifa_monto,
  };
  const detalleVenta = { id_cli: venta.id_cli, id_empl: venta.id_empl };
  const dataCliente = await Cliente.findOne({
    where: { id_cli: detalleVenta.id_cli },
  });
  const dataEmpleado = await Empleado.findOne({
    where: { id_empl: detalleVenta.id_empl },
  });
  try {
    const pdfContrato = await getPDF_CONTRATO(detalle_membresia, detalleVenta);
    const banner1_Attachment = {
      filename: "mailing01.jpg",
      path: "./public/mailingContrato/mailing01.png",
      cid: "mailing1@nodemailer.com", // Identificador único para incrustar la imagen
    };
    const banner2_Attachment = {
      filename: "mailing03.jpg",
      path: "./public/mailingContrato/mailing03.png",
      cid: "mailing2@nodemailer.com", // Identificador único para incrustar la imagen
    };
    const footer_Attachment = {
      filename: "mailing04.jpg",
      path: "./public/mailingContrato/mailing04.png",
      cid: "footer_change@nodemailer.com", // Identificador único para incrustar la imagen
    };
    const mailOptions = {
      from: env.EMAIL_CONTRATOS, // Remitente
      to: "carlosrosales21092002@hotmail.com", // Destinatario(s)
      subject: "Asunto del correo", // Asunto
      text: "Contenido del mensaje", // Cuerpo del correo en texto plano
      attachments: [
        banner1_Attachment,
        banner2_Attachment,
        footer_Attachment,
        {
          filename: "contrato_servicios.pdf", // Nombre que verá el destinatario
          content: Buffer.from(pdfContrato), // Los bytes del PDF en forma de Buffer
          contentType: "application/pdf", // Tipo de contenido
        },
      ],
      // Puedes usar `html` en lugar de `text` para enviar un correo con formato HTML
      html: `${mailMembresiaSTRING(
        `${dataCliente.nombre_cli} ${dataCliente.apPaterno_cli}`,
        id_venta,
        detalleVenta.id_cli,
        detalle_membresia.semanas,
        detalle_membresia.fechaInicio_programa,
        detalle_membresia.fechaFinal,
        detalle_membresia.time_h,
        "Boleta",
        venta.numero_transac,
        detalle_membresia.tarifa,
        detalle_membresia.cong,
        detalle_membresia.nutric,
        `${dataEmpleado.nombre_empl} ${dataEmpleado.apPaterno_empl}`
      )}`,
      headers: {
        "List-Unsubscribe": `<mailto:${env.EMAIL_CONTRATOS}?subject=unsubscribe>`,
      },
    };
    // Envía el correo
    transporterU.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Correo enviado: " + info.response);
    });

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      ok: false,
    });
  }
  // const {
  //   nutric,
  //   semanas,
  //   name_pgm,
  //   fechaFinal,
  //   fechaInicio_programa,
  //   cong,
  //   tarifa_monto,
  //   horario,
  // } = req.ventaProgramas[0];
  // const {
  //   id_cli,
  //   label_cli,
  //   label_empl,
  //   label_tipo_transac,
  //   numero_transac,
  //   email_cli,
  // } = req.detalle_cli;
  // if (!email_cli) {
  //   next();
  //   return;
  // }
  // // Crear un objeto de mensaje para enviar por SMTP
  // if (email_cli.trim().length <= 0) {
  //   next();
  //   return;
  // }
  // const contrato_CLIENT = await getPDF_CONTRATO(
  //   req.ventaProgramas[0],
  //   req.detalle_cli,
  //   (res = response)
  // );
  // const EMAIL_INFO = {
  //   regEmail: email_cli,
  //   nombre_cli: label_cli,
  //   n_contrato: req.ventaID,
  //   cod_participante: id_cli,
  //   membresia: name_pgm,
  //   semanas: semanas,
  //   fec_inicio: fechaInicio_programa,
  //   fec_termino: fechaFinal,
  //   horario: horario,
  //   boleta: `${label_tipo_transac} ${numero_transac}`,
  //   monto: `S/${tarifa_monto}`,
  //   dias_cong: cong,
  //   citas_nut: nutric,
  //   asesor_Fitness: label_empl,
  //   //informacion detail
  //   ubicacion_empresa: "Av. Tarata N°226",
  //   distrito_empresa: "Miraflores",
  //   wsp1: "994 679 163",
  //   wsp2: "960 270 237",
  // };
  // // Leer la imagen del sistema de archivos
  // const imageLOGOAttachment = {
  //   filename: "imageLOGO.jpg",
  //   path: "./public/logo.png",
  //   cid: "LOGO@nodemailer.com", // Identificador único para incrustar la imagen
  // };
  // const imageBANNERAttachment = {
  //   filename: "imageBANNER.jpg",
  //   path: "./public/banner.png",
  //   cid: "BANNER@nodemailer.com", // Identificador único para incrustar la imagen
  // };
  // const mailOptions = {
  //   from: "notificaciones@change.com.pe",
  //   to: `${EMAIL_INFO.regEmail}`,
  //   subject: "Asunto del correo",
  //   attachments: [
  //     imageLOGOAttachment,
  //     imageBANNERAttachment,
  //     {
  //       filename: `${EMAIL_INFO.nombre_cli}.docx`,
  //       path: "./middlewares/CORRECCION DE CONTRATO PT.docx", // Ruta absoluta del archivo que quieres adjuntar
  //     },
  //   ],
  //   html: `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>${EMAIL_INFO.nombre_cli}</title>
  //       <style>
  //           body {
  //               font-family: Arial, sans-serif;
  //           }

  //           table {
  //               width: 100%;
  //               border-collapse: collapse;
  //           }

  //           th {
  //               background-color: #f2f2f2;
  //           }

  //           .logo {
  //               width: 400px;
  //               margin: 0 auto;
  //               display: block;
  //           }

  //           .text-center {
  //               text-align: center;
  //           }

  //           .bold {
  //               font-weight: bold;
  //           }
  //           .bg-primary{
  //               background-color: #FF5000;
  //           }
  //           .bg-black{
  //               background-color: #000;
  //           }
  //           .m-0{
  //               margin: 0;
  //           }
  //           .color-white{
  //               color: #fff;
  //           }
  //           .body-table{
  //               display: flex;
  //               justify-content: center;
  //           }
  //           .dflex-jcenter{
  //               display: flex;
  //               justify-content: center;
  //           }
  //           .table-info tr{
  //               display: flex;
  //               justify-content: center;
  //           }
  //           .table-info td{
  //               width: 100%;
  //           }
  //           .table-info .param{
  //               text-align: right;
  //           }
  //           .table-info tr{
  //               margin-bottom: 5px;
  //           }
  //           .table-info{
  //               font-size: 18px;
  //           }

  //       </style>
  //   </head>

  //   <body>
  //           <table class="body-table" style="margin-bottom: 50px;">
  //               <tbody style="width: 650px;  display: flex; flex-direction: column;">
  //                   <tr>
  //                       <td colspan="2" class="dflex-jcenter">
  //                           <img class="logo" src="cid:LOGO@nodemailer.com" style="display: block; height: 200px; margin: 0px auto 20px; width: 250px; cursor: pointer; min-height: auto; min-width: auto;" alt="Logo">
  //                       </td>
  //                   </tr>
  //                   <tr style="display: flex; justify-content: space-between;">
  //                       <td class="welcome">
  //                           <div style="margin-bottom: 30px;">
  //                               <h1 style="font-size: 25px; margin-bottom: 10px;">Bienvenido(a):</h1>
  //                               <p class="bold m-0" style="font-size: 30px; text-decoration: underline; text-underline-offset: 10px;">${EMAIL_INFO.nombre_cli}</p>
  //                           </div>
  //                           <div style="font-style: italic;">
  //                               <h1 style="margin: 0; font-size: 20px; font-weight: bold;">¡Gracias por unirte a</h1>
  //                               <p style="margin: 0; font-family: 'Archivo Black', sans-serif; color: #FF5000; font-weight: bold; font-size: 30px;">Personal Training!</p>
  //                           </div>
  //                       </td>
  //                       <td class="digitos">
  //                       <div style="width: 140px;" class="bg-primary">
  //                           <p class="bold text-center bg-black color-white bold m-0" style="font-size: 10px; padding: 5px;">CONTRATO N°</p>
  //                           <p class="text-center m-0 color-white" style="font-size: 30px;">${EMAIL_INFO.n_contrato}</p>
  //                       </div>
  //                       <div style="width: 140px; margin-top: 20px;" class="bg-primary">
  //                           <p class="bold text-center bg-black color-white bold m-0" style="font-size: 10px; padding: 5px;">COD. DEL PARTICIPANTE</p>
  //                           <p class="text-center m-0 color-white" style="font-size: 30px;">${EMAIL_INFO.cod_participante}</p>
  //                       </div>
  //                       </td>
  //                   </tr>
  //               </tbody>
  //           </table>

  //               <div style="width: 100%;" class="text-center">
  //                   <span style="background-color: black; color: #fff; padding: 10px 15px; position: relative; top: 10px; font-weight: bold;">
  //                       R E S U M E N
  //                   </span>
  //               </div>

  //               <table class="body-table table-info" style="margin-bottom: 50px;">
  //               <tbody style="width: 500px;  display: flex; flex-direction: column; justify-content: center; border: 1px solid black; padding: 30px 10px; border-radius: 20px;">
  //                   <tr>
  //                       <td class="bold param">Programa: </td>
  //                       <td>${EMAIL_INFO.membresia}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Semanas: </td>
  //                       <td>${EMAIL_INFO.semanas}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Fecha de inicio: </td>
  //                       <td>${EMAIL_INFO.fec_inicio}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Fecha de termino:</td>
  //                       <td>${EMAIL_INFO.fec_termino}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Horario: </td>
  //                       <td>${EMAIL_INFO.horario}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Dias de congelamiento: </td>
  //                       <td>${EMAIL_INFO.dias_cong}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Citas nutricionista:</td>
  //                       <td>${EMAIL_INFO.citas_nut}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Boleta:</td>
  //                       <td>${EMAIL_INFO.boleta}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Monto:</td>
  //                       <td>${EMAIL_INFO.monto}</td>
  //                   </tr>
  //                   <tr>
  //                       <td class="bold param">Asesor Fitness:</td>
  //                       <td>${EMAIL_INFO.asesor_Fitness}</td>
  //                   </tr>
  //               </tbody>
  //           </table>
  //           <tr>
  //           <table class="body-table" style="margin-bottom: 50px;">
  //           <tbody style="width: 650px;  display: flex; flex-direction: column;">
  //                       <td colspan="2" class="dflex-jcenter">
  //                           <img src="BANNER@nodemailer.com" alt="banner"/>
  //                       </td>
  //                   </tr>
  //           </tbody>
  //           </table>
  //   </body>

  //   </html>
  //     `,
  // };
  // // Enviar correo electrónico por SMTP
  // transporterU.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log("Correo electrónico enviado: " + info.response);
  //   }

  //   // Cerrar la conexión SMTP
  //   transporterU.close();
  // });
  // next();
};
const get_VENTAS_detalle_PROGRAMA = async (req = request, res = response) => {};
const get_VENTAS_detalle_PRODUCTO = async (req = request, res = response) => {};
const get_VENTAS_detalle_CITAS = async (req = request, res = response) => {};

const postTraspasoMembresia = async (req = request, res = response) => {
  const {
    id_cli,
    id_empl,
    id_tipo_transaccion,
    numero_transac,
    observacion,
    id_origen,
  } = req.detalle_cli;

  const { id_tt, id_st } = req.body.dataSesiones;
  const {
    tarifa,
    sesiones,
    id_horarioPgm,
    id_pgm,
    fechaInicio_programa,
    fechaFinal,
    time_h,
  } = req.body.formState.dataVenta.detalle_traspaso[0];

  try {
    const venta = new Venta({
      id_cli,
      id_empl,
      id_tipoFactura: id_tipo_transaccion,
      numero_transac,
      observacion,
      id_origen,
      fecha_venta: new Date(),
    });
    await venta.save();
    const detalle_venta_programa = new detalleVenta_membresias({
      id_venta: venta.id,
      id_st: id_st,
      fec_inicio_mem: `${fechaInicio_programa} 00:00:00.000`,
      fec_fin_mem: `${fechaFinal.split("T")[0]}`,
      id_pgm,
      id_tarifa: id_tt,
      horario: time_h,
      tarifa_monto: tarifa,
    });
    await detalle_venta_programa.save();

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      ok: false,
    });
  }
};
const obtenerVentasMembresiaxEmpresa = async (
  req = request,
  res = response
) => {
  try {
    const ventas = await Venta.findAll({
      where: { flag: true },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: Cliente,
          attributes: [
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
          ],
        },
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
        {
          model: detalleVenta_membresias,
          attributes: [
            "id_venta",
            "id_pgm",
            "id_tarifa",
            "horario",
            "id_st",
            "tarifa_monto",
          ],
        },
      ],
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      ok: false,
    });
  }
};
const obtenerContratosClientes = async (req = request, res = response) => {
  const { id_enterprice } = req.params;
  try {
    const datacontratosConMembresias = await Venta.findAll({
      where: {
        id_empresa: id_enterprice,
        flag: true,
        id_tipoFactura: {
          [Op.ne]: 84, // Excluye los registros con id_tipoFactura igual a 84
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_membresias,
          attributes: {
            exclude: ["id_venta", "id_pgm", "horario", "id_st"],
          },
          include: [
            {
              model: ImagePT,
              attributes: ["id", "uid_location", "name_image"],
              as: "contrato_x_serv",
            },
            {
              model: ImagePT,
              attributes: ["id", "uid_location", "name_image"],
              as: "firma_cli",
              // required: true,
            },
          ],
        },
      ],
    });
    res.status(200).json({
      msg: true,
      datacontratosConMembresias,
    });
  } catch (error) {
    res.status(404).json({
      msg: false,
    });
  }
};
const obtenerClientesVentas = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ["id_cli", "nombre_cli"],
      where: {
        flag: true,
      },
      order: [["id_cli", "DESC"]],
      limit: 100,
      include: [
        {
          model: Venta,
          where: {
            fecha_venta: {
              [Op.between]: [new Date("2024-01-21"), new Date("2024-09-21")],
            },
          },
          limit: 2,
          order: [["fecha_venta", "DESC"]],
          required: false,
        },
      ],
      // raw: true,
    });
    res.status(201).json({
      msg: true,
      data: clientes,
    });
  } catch (error) {
    console.log(error);
  }
};
function bytesToBase64(bytes) {
  // Convertir bytes a cadena binaria
  let binaryString = "";
  bytes.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  // Convertir la cadena binaria en Base64
  return btoa(binaryString);
}
module.exports = {
  postVenta,
  get_VENTAS,
  get_VENTA_ID,
  get_VENTAS_detalle_PROGRAMA,
  get_VENTAS_detalle_PRODUCTO,
  get_VENTAS_detalle_CITAS,
  getPDF_CONTRATO,
  obtener_contrato_pdf,
  getVentasxFecha,
  mailMembresia,
  postTraspasoMembresia,
  estadosClienteMembresiaVar,
  comparativaPorProgramaApi,
  obtenerVentasMembresiaxEmpresa,
  obtenerContratosClientes,
  obtenerClientesVentas,
};
