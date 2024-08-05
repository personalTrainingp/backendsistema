const { response, request } = require("express");
const { FormaPago } = require("../models/Forma_Pago");
const { v4 } = require("uuid");
const formaPagoPOST = async (req = request, res = response) => {
  try {
    const {
      uid_avatar = v4(),
      id_forma_pago,
      id_tipo_tarjeta,
      id_tarjeta,
      id_banco,
    } = req.body;
    const formPay = new FormaPago({
      uid_avatar,
      id_forma_pago,
      id_tipo_tarjeta,
      id_tarjeta,
      id_banco,
    });
    await formPay.save();
    res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de formaPagoPOST, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  formaPagoPOST,
};
