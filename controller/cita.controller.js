const { Sequelize } = require("sequelize");
const { Cita } = require("../models/Cita");
const { Cliente } = require("../models/Usuarios");
const { detalleVenta_citas } = require("../models/Venta");
const { Servicios } = require("../models/Servicios");
const { request, response } = require("express");

const getCitas = async (req = request, res = response) => {
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
      include: [
        {
          model: Cliente,
          attributes: [
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("nombre_cli"),
                " ",
                Sequelize.col("apPaterno_cli"),
                " ",
                Sequelize.col("apMaterno_cli")
              ),
              "nombres_apellidos_cli",
            ],
          ],
        },
        {
          model: detalleVenta_citas,
          include: [
            {
              model: Servicios,
              attributes: ["id"],
            },
          ],
        },
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
const postCita = async (req = request, res = response) => {
  const { id_cli, id_detallecita, fecha_init, fecha_final, status_cita } =
    req.body;
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
const getCitaporID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const cita = await Cita.findOne({ where: { flag: true, id } });
    res.status(200).json({
      ok: true,
      cita,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador: getCitaporID",
    });
  }
};
const deleteCita = async (req = request, res = response) => {};
const putCita = async (req = request, res = response) => {};

module.exports = {
  getCitas,
  postCita,
  getCitaporID,
  deleteCita,
  putCita,
};
