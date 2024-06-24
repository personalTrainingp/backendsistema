const { response, request } = require("express");
const { generatePDFcontrato } = require("../config/pdfKit");
const PDFDocument = require("pdfkit");
const {
  Venta,
  detalleVenta_producto,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_pagoVenta,
} = require("../models/Venta");
const { Cliente, Empleado } = require("../models/Usuarios");
const { Sequelize } = require("sequelize");
const { Producto } = require("../models/Producto");
const {
  ProgramaTraining,
  SemanasTraining,
  TarifaTraining,
} = require("../models/ProgramaTraining");
const { HorarioProgramaPT } = require("../models/HorarioProgramaPT");

const postVenta = async (req = request, res = response) => {
  // const {} = req.body;
  // console.log(req, "en post ventas");
  // console.log(req.ventaProgramas);
  // if(req.ventaProgramas)
  // Venta(req.body);
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
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postVenta, hable con el administrador: ${error}`,
    });
  }
};

const getPDF_CONTRATO = (req = request, res = response) => {
  const { firmaCli } = req.body.dataVenta;
  /**
   * NEED:
   * FIRMA,
   */
  // Crear un nuevo documento PDF
  const doc = new PDFDocument();

  // Escribir contenido en el documento
  doc.text("Este es un PDF generado dinámicamente con Express y PDFKit.");
  // Agregar la imagen al documento
  // Agregar la imagen al documento si está definida, de lo contrario, agregar el texto "Sin firma"
  if (firmaCli) {
    doc.image(firmaCli, {
      fit: [250, 250], // Tamaño de la imagen (opcional)
      align: "center", // Alineación de la imagen (opcional)
      valign: "center", // Alineación vertical de la imagen (opcional)
    });
  } else {
    doc.text("Sin firma", {
      align: "center", // Alineación del texto (opcional)
      valign: "center", // Alineación vertical del texto (opcional)
    });
  }
  // Configurar el tipo de contenido como PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=ejemplo.pdf");

  // Transmitir el PDF al cliente
  doc.pipe(res);
  doc.end();
};
const get_VENTAS = async (req = request, res = response) => {
  try {
    const ventas = await Venta.findAll({
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
      where: { id: id },
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
          ],

          include: [
            {
              model: ProgramaTraining,
              attributes: ["name_pgm"],
            },
            {
              model: SemanasTraining,
              attributes: ["semanas_st", "congelamiento_st", "nutricion_st"],
              include: [
                {
                  model: TarifaTraining,
                  attributes: ["tarifaCash_tt", "nombreTarifa_tt"],
                },
              ],
            },
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
      venta,
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
};
