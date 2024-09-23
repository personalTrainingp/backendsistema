const { response, request } = require("express");
const { generatePDFcontrato } = require("../config/pdfKit");
const { PDFDocument, rgb } = require("pdf-lib");
const {
  Venta,
  detalleVenta_producto,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_pagoVenta,
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
  // const {} = req.body;
  // console.log(req, "en post ventas");
  // console.log(req.ventaProgramas);
  // if(req.ventaProgramas)
  // Venta(req.body);
  const uid_firma = v4();
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
      const ventasMembresiasConIdVenta = await req.ventaProgramas.map(
        (mem) => ({
          id_venta: req.ventaID,
          uid_firma: uid_firma,
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de postVenta, hable con el administrador: ${error}`,
    });
  }
};
const CONTRATO_CLIENT = async (req = request, res = response) => {
  const {
    firmaCli,
    nutric,
    cong,
    time_h,
    id_pgm,
    name_pgm,
    fechaInicio_programa,
    fechaFinal,
  } = req.body.dataVenta;
  const dataInfo = {
    nombresCliente: "Carlos Kenedy",
    apPaternoCliente: "Rosales",
    dni: "60936591",
    DireccionCliente: "direccion avenida",
    PaisCliente: "Peru",
    CargoCliente: "Empleado",
    EmailCliente: "carlosrosales21092002@gmail.com",
    EdadCliente: "22",
    apMaternoCliente: "Morales",
    DistritoCliente: "Barranco",
    FechaDeNacimientoCliente: "21 de setiembre del 2002",
    CentroDeTrabajoCliente: "Empresa",
    origenCliente: "Facebook",
    sede: "Miraflores",
    nContrato: "1234",
    codigoSocio: "123",
    fecha_venta: "21/09/2024",
    hora_venta: "13:00:00 p.m.",
    //datos de membresia
    id_pgm: 4,
    Programa: "MUSCLE",
    fec_inicio: "21/09/2024",
    fec_fin: "21/09/2025",
    horario: "05:00 pm",
    semanas: "4",
    dias_cong: "5",
    sesiones_nutricion: "8",
    asesor: "Alvaro",
    forma_pago: [
      "Tarj. de credito Bbva",
      "yape",
      "plin",
      "transferencia bancaria",
    ],
    monto: "1,150.00",
    //Firma
    firma_cli: firmaCli,
  };
  // Cargar el PDF existente
  const existingPdfBytes = fs.readFileSync("input.pdf");
  // Cargar el documento PDF en memoria
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // Obtener la primera página del PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const page13 = pages[12];
  const page10 = pages[9];

  //IMAGEN DE UN CHECK
  const IMAGEcheck = path.join(__dirname, "..", "public", "Green_check.png");
  // Leer la imagen como buffer
  const imagecheckBuffer = fs.readFileSync(IMAGEcheck);

  const pngImage = await pdfDoc.embedPng(imagecheckBuffer);
  switch (dataInfo.id_pgm) {
    case 2:
      // Dibujar la imagen en la primera página en una posición y tamaño especificado
      const checkCHANGE45 = firstPage.drawImage(pngImage, {
        x: 180,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case 3:
      const checkFS45 = firstPage.drawImage(pngImage, {
        x: 295,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case 4:
      const checkMUSCLE45 = firstPage.drawImage(pngImage, {
        x: 410,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    default:
      break;
  }

  if (dataInfo.firma_cli) {
    // Decodificar la imagen base64 en un buffer
    const base64Data = dataInfo.firma_cli.split(",")[1]; // Obtener solo la parte base64 sin el encabezado
    const imageBuffer = Buffer.from(base64Data, "base64");
    // Incrustar la imagen PNG en el PDF
    const pngImage = await pdfDoc.embedPng(imageBuffer); // O embedJpg si es una imagen JPG
    // Dibujar la imagen en la primera página en una posición y tamaño especificado
    firstPage.drawImage(pngImage, {
      x: 255,
      y: 60,
      width: 100,
      height: 60,
    });
    page10.drawImage(pngImage, {
      x: 250,
      y: 430,
      width: 120,
      height: 50,
    });
    page13.drawImage(pngImage, {
      x: 250,
      y: 166,
      width: 120,
      height: 50,
    });
  }

  //*DATOS CABECERA
  const sede = firstPage.drawText(dataInfo.sede, {
    x: 110,
    y: 650,
    size: 12,
    color: rgb(0, 0, 0),
  });
  const fecha_hora_venta = firstPage.drawText(
    `${dataInfo.fecha_venta} ${dataInfo.hora_venta}`,
    {
      x: 390,
      y: 650,
      size: 12,
      color: rgb(0, 0, 0),
    }
  );
  const nContrato = firstPage.drawText(`#${dataInfo.nContrato}`, {
    x: 67,
    y: 800,
    size: 30,
    color: rgb(0, 0, 0),
  });
  const codigoSocio = firstPage.drawText(`#${dataInfo.codigoSocio}`, {
    x: 440,
    y: 800,
    size: 30,
    color: rgb(0, 0, 0),
  });

  //*DATOS PERSONALES DEL SOCIO
  //Primera fila
  const nombresCliente = firstPage.drawText(dataInfo.nombresCliente, {
    x: 183,
    y: 590,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apPaternoCliente = firstPage.drawText(dataInfo.apPaternoCliente, {
    x: 183,
    y: 565,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const dniCliente = firstPage.drawText(dataInfo.dni, {
    x: 183,
    y: 539,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DireccionCliente = firstPage.drawText(dataInfo.DireccionCliente, {
    x: 183,
    y: 510,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const PaisCliente = firstPage.drawText(dataInfo.PaisCliente, {
    x: 183,
    y: 478,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const CargoCliente = firstPage.drawText(dataInfo.CargoCliente, {
    x: 183,
    y: 448,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const EmailCliente = firstPage.drawText(dataInfo.EmailCliente, {
    x: 183,
    y: 418,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //Segunda columna
  const EdadCliente = firstPage.drawText(dataInfo.EdadCliente, {
    x: 420,
    y: 590,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apMaternoCliente = firstPage.drawText(dataInfo.apMaternoCliente, {
    x: 420,
    y: 565,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DistritoCliente = firstPage.drawText(dataInfo.DistritoCliente, {
    x: 420,
    y: 539,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FechaDeNacimientoCliente = firstPage.drawText(
    dataInfo.FechaDeNacimientoCliente,
    {
      x: 420,
      y: 510,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const CentroDeTrabajoCliente = firstPage.drawText(
    dataInfo.CentroDeTrabajoCliente,
    {
      x: 420,
      y: 478,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const origenCliente = firstPage.drawText(dataInfo.origenCliente, {
    x: 420,
    y: 448,
    size: 9,
    color: rgb(0, 0, 0),
  });

  //*DATOS DEL PROGRAMA
  //Columna 1
  const Programa = firstPage.drawText(dataInfo.Programa, {
    x: 176,
    y: 280,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FecInicio = firstPage.drawText(dataInfo.fec_inicio, {
    x: 176,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FormaPago = firstPage.drawText(
    dataInfo.forma_pago.length > 0
      ? dataInfo.forma_pago.slice(0, -1).join(", ") +
          " y " +
          dataInfo.forma_pago.slice(-1)
      : "Ninguna",
    {
      x: 176,
      y: 225,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const DiasDeCongelamiento = firstPage.drawText(dataInfo.dias_cong, {
    x: 176,
    y: 196,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //Columna 2
  const FechaFin = firstPage.drawText(dataInfo.fec_fin, {
    x: 335,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const SesionesNutricionista = firstPage.drawText(
    dataInfo.sesiones_nutricion,
    {
      x: 335,
      y: 196,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  //Columna 3
  const Sesiones = firstPage.drawText(`${dataInfo.semanas * 6}`, {
    x: 476,
    y: 280,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const horario = firstPage.drawText(`${dataInfo.horario}`, {
    x: 476,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const asesor = firstPage.drawText(`${dataInfo.asesor}`, {
    x: 476,
    y: 196,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const Monto = firstPage.drawText(dataInfo.monto, {
    x: 476,
    y: 225,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //*DATO DEL pag 09
  page10.drawText(
    `${dataInfo.nombresCliente} ${dataInfo.apPaternoCliente} ${dataInfo.apMaternoCliente}`,
    {
      x: 205,
      y: 527,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  page10.drawText(`${dataInfo.dni}`, {
    x: 205,
    y: 502,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //*DATO DEL pag 13
  page13.drawText(`${dataInfo.fecha_venta} ${dataInfo.hora_venta}`, {
    x: 397,
    y: 306,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page13.drawText(
    `${dataInfo.nombresCliente} ${dataInfo.apPaternoCliente} ${dataInfo.apMaternoCliente}`,
    {
      x: 205,
      y: 261,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  page13.drawText(`${dataInfo.dni}`, {
    x: 205,
    y: 234,
    size: 9,
    color: rgb(0, 0, 0),
  });

  // Serializar el documento PDF a bytes
  const pdfBytes = await pdfDoc.save();
  req.byteContrato = pdfBytes;
  next();
};
const getPDF_CONTRATO = async (req = request, res = response) => {
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
  } = req.body.dataVenta;
  const fecha_Venta = new Date();
  const { id_empl, id_cliente } = req.body.detalle_cli_modelo;
  const data_cliente = await Cliente.findOne({
    where: { flag: true, id_cli: id_cliente },
  });
  const data_empl = await Empleado.findOne({
    where: { flag: true, id_empl: id_empl },
  });
  const data_tarifa = await TarifaTraining.findOne({
    where: { flag: true, tarifaCash_tt: tarifa },
  });
  console.log(data_tarifa.tarifaCash_tt);

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
    monto: `S/. ${formatearNumero(data_tarifa.tarifaCash_tt)}`,
    //Firma
    firma_cli: firmaCli,
  };

  const pdfContrato = await Client_Contrato(dataInfo);

  // Enviar el PDF como respuesta
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=CONTRATO-CLIENTE.pdf"
  );
  res.send(Buffer.from(pdfContrato));
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
          ],
        },
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "id_servicio", "tarifa_monto"],
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
const get_VENTAS_detalle_PROGRAMA = async (req = request, res = response) => {};
const get_VENTAS_detalle_PRODUCTO = async (req = request, res = response) => {};
const get_VENTAS_detalle_CITAS = async (req = request, res = response) => {};
module.exports = {
  postVenta,
  get_VENTAS,
  get_VENTA_ID,
  get_VENTAS_detalle_PROGRAMA,
  get_VENTAS_detalle_PRODUCTO,
  get_VENTAS_detalle_CITAS,
  getPDF_CONTRATO,
  CONTRATO_CLIENT,
  getVentasxFecha,
};
