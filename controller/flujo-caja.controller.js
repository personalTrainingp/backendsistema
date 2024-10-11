const { request, response } = require("express");
const {
  Venta,
  detalleVenta_producto,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_pagoVenta,
} = require("../models/Venta");
const { Producto } = require("../models/Producto");
const { Servicios } = require("../models/Servicios");
const { Op, Sequelize } = require("sequelize");

const getIngresosxMESandAnio = async (req = request, res = response) => {
  const { mes, anio } = req.query;
  try {
    const ventasProgramas = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
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
          model: detalleVenta_membresias,
          required: true,
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
    const ventasCitasTipoNutri = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
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
          model: detalleVenta_citas,
          attributes: ["id_venta", "tarifa_monto"],
          required: true,
          include: [
            {
              model: Servicios,
              attributes: ["id", "tipo_servicio", "nombre_servicio"],
              where: { tipo_servicio: "NUTRI" },
            },
          ],
        },
      ],
    });
    const ventasCitasTipoFito = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
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
          model: detalleVenta_citas,
          attributes: ["id_venta", "tarifa_monto"],
          include: [
            {
              model: Servicios,
              required: true,
              attributes: ["id", "tipo_servicio", "nombre_servicio"],
              where: { tipo_servicio: "FITOL" },
            },
          ],
        },
      ],
    });
    const ventasProductos18 = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
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
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          required: true,
          include: [
            {
              model: Producto,
              attributes: ["id", "id_categoria"],
              where: { id_categoria: 18 },
            },
          ],
        },
      ],
    });
    const ventasProductos17 = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
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
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          required: true,
          include: [
            {
              model: Producto,
              attributes: ["id", "id_categoria"],
              where: { id_categoria: 17 },
            },
          ],
        },
      ],
    });
    // Sumar todas las tarifas
    const programa_MONTO = ventasProgramas.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaMembresia?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const citasNutri_MONTO = ventasCitasTipoNutri.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaCitas?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const citasFito_MONTO = ventasCitasTipoFito.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaCitas?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const producto18_MONTO = ventasProductos18.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaProductos?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const producto17_MONTO = ventasProductos17.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaProductos?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);

    res.status(200).json({
      ok: true,
      data: {
        programa_MONTO,
        citasNutri_MONTO,
        citasFito_MONTO,
        producto18_MONTO,
        producto17_MONTO,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      msg: "Invalid",
      error: error,
    });
  }
};

const getGastosMensualesxANIO = async (req = request, res = response) => {
  const { anio } = req.query;
  try {
    
    res.status(200).json({
      ok: true,
      data: "",
    });
  } catch (error) {
    res.status(501).json({
      ok: true,
      data: "",
    });
  }
};
module.exports = {
  getIngresosxMESandAnio,
};
