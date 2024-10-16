const { request, response } = require("express");

const validarUploadsPath = async (req = request, res = response, next) => {
  console.log(req.files);
  return res.json({
    msg: "pasa por aca",
  });
  next();
};
module.exports = {
  validarUploadsPath,
};
