const { Cita } = require("../models/Cita");
const { Cliente } = require("../models/Usuarios");

const getCitas = async (req, res) => {
  const { servicion } = req.body;
  try {
    const citas = await Cita.findAll({
      where: { flag: true },
      attributes: [
        "id_detallecita",
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
  const { id_cli, id_detallecita, fecha_init, fecha_final, status_cita } = req.body;
  try {
    const cita = new Cita({
      id_detallecita,
      id_cli,
      fecha_init,
      fecha_final,
      status_cita,
    });
    await cita.save();
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
