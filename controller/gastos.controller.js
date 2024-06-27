const { request, response } = require("express");
const { Gastos, ParametroGastos } = require("../models/GastosFyV");
const { Proveedor } = require("../models/Proveedor");
const { Sequelize } = require("sequelize");
const { Parametros } = require("../models/Parametros");

const postGasto = async (req = request, res = response) => {
  try {
    const gasto = new Gastos(req.body);
    await gasto.save();
    res.status(200).json({
      msg: "success",
      gasto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de postGasto, hable con el administrador: ${error}`,
    });
  }
};
const getGastos = async (req = request, res = response) => {
  try {
    const gastos = await Gastos.findAll({
      where: {
        flag: true,
        [Sequelize.Op.and]: Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("fec_pago")),
          "<",
          2030
        ),
        id: {
          [Sequelize.Op.not]: 2548,
        },
      },
      order: [["fec_registro", "desc"]],
      attributes: [
        "id",
        "moneda",
        "monto",
        "fec_pago",
        "id_tipo_comprobante",
        "n_comprabante",
        "impuesto_igv",
        "impuesto_renta",
        "fec_comprobante",
        "n_operacion",
        "fec_registro",
        "fec_comprobante",
        "descripcion",
        "id_prov",
      ],
      include: [
        {
          model: Proveedor,
          attributes: ["razon_social_prov"],
        },
        {
          model: ParametroGastos,
          attributes: ["nombre_gasto", "grupo", "id_tipoGasto"],
        },
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
          as: "parametro_comprobante",
        },
      ],
    });
    res.status(200).json({
      msg: "success",
      gastos,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getGastos, hable con el administrador: ${error}`,
    });
  }
};
const getProveedoresGastos_SinRep = async (req = request, res = response) => {
  try {
    const proveedoresUnicos = await Gastos.findAll({
      attributes: [
        "id_prov",
        [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
        [
          Sequelize.literal('MAX("tb_Proveedor"."razon_social_prov")'),
          "razon_social_prov",
        ], // Corregido
      ],
      include: [
        {
          model: Proveedor,
          attributes: [],
        },
      ],
      group: ["id_prov"],
      having: Sequelize.literal("COUNT(*) > 1"),
    });
    res.status(200).json({
      msg: "success",
      proveedoresUnicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};
const getGasto = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const gasto = await Gastos.findOne({
      where: { flag: true, id },
      attributes: [
        "id",
        "id_gasto",
        "grupo",
        "moneda",
        "monto",
        "id_tipo_comprobante",
        "n_comprabante",
        "impuesto_igv",
        "impuesto_renta",
        "fec_pago",
        "fec_comprobante",
        "id_forma_pago",
        "id_banco_pago",
        "n_operacion",
        "id_rubro",
        "descripcion",
        "id_prov",
      ],
    });
    res.status(200).json({
      msg: "success",
      gasto,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getGastos, hable con el administrador: ${error}`,
    });
  }
};
const putGasto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const gasto = await Gastos.findOne({ where: { flag: true, id } });
    await gasto.update(req.body);
    res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de putGasto, hable con el administrador: ${error}`,
    });
  }
};
const deleteGasto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const gasto = await Gastos.findByPk(id);
    await gasto.update({ flag: false });
    res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de putGasto, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  postGasto,
  getGastos,

  getGasto,
  putGasto,
  deleteGasto,
  getProveedoresGastos_SinRep,
};
