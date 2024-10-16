const { request } = require("express");

const validarFile = async (req=request, res, next) => {
  console.log("ASDF");
  console.log(req.params);

  next();
};
module.exports = {
  validarFile,
};
