const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  //x-token en los header
  const token = req.header("X-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid, name, rol_user } = jwt.verify(token, process.env.SECRET_KEY);

    req.uid = uid;
    req.name = name;
    req.rol_user = rol_user;
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();
};
module.exports = {
  validarJWT,
};
