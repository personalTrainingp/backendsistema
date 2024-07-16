const { Auditoria } = require("../models/Auditoria");
const { Usuario } = require("../models/Usuarios");

const postAudit = async (req, res) => {
  const userIp = req.userIp;
  const { id_user, ip_user, accion, observacion } = req.body;
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const getTBAudit = async (req, res) => {
  try {
    const audit = await Auditoria.findAll({
      where: { flag: true },
      order: [["id", "desc"]],
      attributes: [
        "id_user",
        "ip_user",
        "accion",
        "observacion",
        "fecha_audit",
      ],
      include: [
        {
          model: Usuario,
          attributes: ["usuario_user"],
        },
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
