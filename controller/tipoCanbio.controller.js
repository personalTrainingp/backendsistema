const axios = require("axios");
const { response, request } = require("express");
const { TipoCambio } = require("../models/TipoCambio");
const {
  extraerTipoCambioDeSUNAT_FECHA_ACTUAL,
} = require("../middlewares/scrap_TIPO_CAMBIO_DOLAR");

const obtenerTipoCambioxFecha = async (req = request, res = response) => {
  const { fecha } = req.query;
  const token = "apis-token-9259.J4rGm7r47gM81tbpyuFuNaFaod1QfRWS";
  // console.log(fecha);

  try {
    // Buscar en la base de datos
    const tipoCambio = await TipoCambio.findOne({ where: { fecha } });

    if (tipoCambio) {
      // Retornar datos si existen en la base de datos
      return res.status(200).json({
        msg: "success",
        data: tipoCambio, // Devolver los datos desde la base de datos
      });
    }
    const respuesta = await extraerTipoCambioDeSUNAT_FECHA_ACTUAL();
    const nuevoTipoCambio = await TipoCambio.create({
      fecha: fecha,
      precio_compra: respuesta.precio_compra, // Ajusta según los campos que devuelva la API
      precio_venta: respuesta.precio_venta, // Ajusta según los campos que devuelva la API
      moneda: respuesta.moneda,
    });

    res.status(200).json({
      msg: "success",
      data: nuevoTipoCambio, // Extraer solo los datos de la respuesta
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de obtenerTipoCambioxFecha, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  obtenerTipoCambioxFecha,
};
