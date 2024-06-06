const { response, request } = require("express");
const { FormaPago } = require("../models/Forma_Pago");

const formaPagoPOST = async (req = request, res = response) => {
  try {
    let formPay = new FormaPago(req.body);
    formPay.save();
    const pays = await FormaPago.findAll({ where: { flag: true } });
    res.status(200).json({
      msg: "success",
      pays,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de formaPagoPOST, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  formaPagoPOST,
};
