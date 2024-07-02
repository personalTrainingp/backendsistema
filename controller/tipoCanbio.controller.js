const axios = require("axios");
const { response, request } = require("express");

const obtenerTipoCambioxFecha = async (req = request, res = response) => {
  const { fecha } = req.query;
  const token = "apis-token-9259.J4rGm7r47gM81tbpyuFuNaFaod1QfRWS";

  try {
    const response = await axios.get(
      `https://api.apis.net.pe/v2/sunat/tipo-cambio?date=${fecha}`,
      {
        headers: {
          Referer: "https://apis.net.pe/tipo-de-cambio-sunat-api",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json({
      msg: "success",
      data: response.data, // Extraer solo los datos de la respuesta
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
