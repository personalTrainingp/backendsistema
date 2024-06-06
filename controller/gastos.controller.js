const { request, response } = require("express");
const { Gastos, ParametroGastos } = require("../models/GastosFyV");
const { Proveedor } = require("../models/Proveedor");
const { Sequelize } = require("sequelize");

const postGasto = async (req = request, res = response) => {
  try {
    const gasto = new Gastos(req.body);
    await gasto.save();
    res.status(200).json({
      msg: "success",
      gasto,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postGasto, hable con el administrador: ${error}`,
    });
  }
};
const getGastos = async (req = request, res = response) => {
  try {
    const gastos = await Gastos.findAll({
      where: { flag: true },
      attributes: [
        "id",
        "moneda",
        "monto",
        "fec_pago",
        "fec_registro",
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
          attributes: ["nombre_gasto"],
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
        [Sequelize.literal("DISTINCT [tb_egresos].[id_prov]"), "id_prov"],
      ],
      include: [
        {
          model: Proveedor,
          attributes: ["razon_social_prov"],
        },
      ],
      raw: true,
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
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de putGasto, hable con el administrador: ${error}`,
    });
  }
};
const deleteGasto = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const gasto = await Gastos.findOne({ where: { flag: true, id } });
    await gasto.update({ flag: false });
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
