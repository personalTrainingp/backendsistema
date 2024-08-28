const axios = require("axios");
const { response, request } = require("express");
const { TipoCambio } = require("../models/TipoCambio");
const {
  extraerTipoCambioDeSUNAT_FECHA_ACTUAL,
} = require("../middlewares/scrap_TIPO_CAMBIO_DOLAR");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

const obtenerTipoCambioxFecha = async (req = request, res = response) => {
  // const { fecha } = req.query;
  const token = "apis-token-9259.J4rGm7r47gM81tbpyuFuNaFaod1QfRWS";
  // console.log(fecha);

  try {
    // Buscar en la base de datos
    // const tipoCambio = await TipoCambio.findOne({ where: { fecha } });

    // if (tipoCambio) {
    //   // Retornar datos si existen en la base de datos
    //   return res.status(200).json({
    //     msg: "success",
    //     data: tipoCambio, // Devolver los datos desde la base de datos
    //   });
    // }
    const respuesta = await extraerTipoCambioDeSUNAT_FECHA_ACTUAL();
    // const nuevoTipoCambio = await TipoCambio.create({
    //   fecha: fecha,
    //   precio_compra: respuesta.precio_compra, // Ajusta según los campos que devuelva la API
    //   precio_venta: respuesta.precio_venta, // Ajusta según los campos que devuelva la API
    //   moneda: respuesta.moneda,
    // });

    res.status(200).json({
      msg: "success con rsp",
      data: respuesta, // Extraer solo los datos de la respuesta
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de obtenerTipoCambioxFecha, hable con el administrador: ${error}`,
    });
  }
};
const obtenerTipoCambiosxFechas = async (req = request, res = response) => {
  const { arrayDate } = req.query;
  // console.log(
  //   dayjs(new Date(arrayDate[0])).format("YYYY-MM-DD"),
  //   dayjs(new Date(arrayDate[1])).format("YYYY-MM-DD")
  // );

  try {
    const Cambio = await TipoCambio.findAll({
      where: {
        fecha: {
          [Op.between]: [
            dayjs(new Date(arrayDate[0])).format("YYYY-MM-DD"),
            dayjs(new Date(arrayDate[1])).format("YYYY-MM-DD"),
          ],
        },
      },
      attributes: ["moneda", "fecha", "precio_compra", "precio_venta"],
    });
    console.log(Cambio);

    res.status(200).json({
      msg: "success",
      data: Cambio,
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
  obtenerTipoCambiosxFechas,
};
