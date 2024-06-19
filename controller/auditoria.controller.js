const { Auditoria } = require("../models/Auditoria");

const postAudit = async (req, res) => {
    
};
const getTBAudit = async (req, res) => {
  try {
    const audit = await Auditoria.findAll({
      where: { flag: true },
      attributes: [
        "id_user",
        "ip_user",
        "accion",
        "observacion",
        "fecha_audit",
      ],
    });
    res.status(200).json({
      ok: true,
      audit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  postAudit,
  getTBAudit,
};
