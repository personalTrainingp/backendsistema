const { Cita } = require("../models/Cita");
const { Cliente } = require("../models/Usuarios");

const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      where: { flag: true },
      attributes: [
        "id_cita",
        "id_cli",
        "fecha_init",
        "fecha_final",
        "status_cita",
      ],
    });
    res.status(200).json({
      ok: true,
      citas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const postCita = async (req, res) => {
  const { id_cli, id_cita, fecha_init, fecha_final, status_cita } = req.body;
  try {
    const cita = await Cita.create({
      id_cita,
      id_cli,
      fecha_init,
      fecha_final,
      status_cita,
    });
    res.status(200).json({
      ok: true,
      cita,
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
  getCitas,
  postCita,
};
