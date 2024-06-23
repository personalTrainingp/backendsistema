const { Sequelize } = require("sequelize");
const { Prospecto } = require("../models/Prospecto");
const { request, response } = require("express");
const { ProgramaTraining } = require("../models/ProgramaTraining");
const { Empleado } = require("../models/Usuarios");
const uid = require("uuid");
const postProspecto = async (req = request, res = response) => {
  const {
    nombres,
    apellido_materno,
    apellido_paterno,
    id_pgm,
    id_empl,
    celular,
    correo,
  } = req.body;
  try {
    const prospecto = new Prospecto({
      uid: uid.v4(),
      uid_comentario: uid.v4(),
      nombres,
      apellido_materno,
      apellido_paterno,
      celular,
      correo,
      id_pgm,
      id_empl,
      fecha_registro: new Date(),
    });
    await prospecto.save();
    res.status(200).json(prospecto);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getProspectos = async (req = request, res = response) => {
  try {
    const prospectos = await Prospecto.findAll({
      attributes: [
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("nombres"),
            " ",
            Sequelize.col("apellido_paterno"),
            " ",
            Sequelize.col("apellido_materno")
          ),
          "nombres_apellidos",
        ],
        "celular",
        "correo",
        "fecha_registro",
        "id",
      ],
      where: { flag: true },
      include: [
        {
          model: Empleado,
          attributes: [
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("nombre_empl"),
                " ",
                Sequelize.col("apPaterno_empl"),
                " ",
                Sequelize.col("apMaterno_empl")
              ),
              "nombres_apellidos_empl",
            ],
          ],
        },
        {
          model: ProgramaTraining,
          attributes: ["name_pgm"],
        },
      ],
    });
    res.status(200).json({
      msg: true,
      prospectos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getProspectoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "No hay id",
      });
    }
    const prospecto = await Prospecto.findOne({
      where: { flag: true, id: id },
    });
    if (!prospecto) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un proveedor con el id "${id}"`,
      });
    }
    res.status(200).json({
      prospecto,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const putProspecto = async (req, res) => {
  try {
    const { id } = req.params;
    const prospecto = await Prospecto.findByPk(id);
    if (!prospecto) {
      return res.status(404).json({
        ok: false,
        msg: "No hay ningun prospecto con ese id",
      });
    }

    prospecto.update(req.body);
    res.status(200).json({
      msg: prospecto,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error al eliminar el prospecto. Hable con el encargado de sistema",
      error: error.message,
    });
  }
};
const deleteProspecto = async (req, res) => {
  try {
    const { id } = req.params;
    const prospecto = await Prospecto.findByPk(id, { flag: true });
    if (!prospecto) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un prospecto con el id "${id}"`,
      });
    }
    prospecto.update({ flag: false });
    res.status(200).json({
      msg: prospecto,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error al eliminar el prospecto. Hable con el encargado de sistema",
      error: error.message,
    });
  }
};
module.exports = {
  postProspecto,
  getProspectos,
  getProspectoPorID,
  putProspecto,
  deleteProspecto,
};
