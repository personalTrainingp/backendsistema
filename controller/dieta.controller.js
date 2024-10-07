const { request, response } = require("express");
const { Auditoria } = require("../models/Auditoria");
const { Usuario } = require("../models/Usuarios");
const {
  plan_Alimenticio_x_cliente,
  HistorialClinico,
} = require("../models/FileForUser");
const { v4 } = require("uuid");
const { ImagePT } = require("../models/Image");

const postDieta = async (req = request, res = response) => {
  const { id_cli } = req.params;
  const uid_dieta = v4();
  try {
    const { nombre_dieta, descripcion_dieta } = req.body;
    const dieta = new plan_Alimenticio_x_cliente({
      nombre_dieta,
      descripcion_dieta,
      id_cli: id_cli,
      uid_file_dieta: uid_dieta,
    });
    await dieta.save();
    res.status(201).json({
      ok: true,
      uid_dieta: uid_dieta,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: error,
    });
  }
};
const obtenerDietasxCliente = async (req = request, res = response) => {
  const { id_cli } = req.params;
  try {
    const dietasxCliente = await plan_Alimenticio_x_cliente.findAll({
      where: { id_cli: id_cli, flag: true },
      include: [
        {
          model: ImagePT,
        },
      ],
    });
    res.status(200).json({
      ok: true,
      dietasxCliente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: error,
    });
  }
};
const deleteDieta = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const dieta = await plan_Alimenticio_x_cliente.findOne({
      where: { id: id },
    });
    await dieta.update({ flag: false });
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: error,
    });
  }
};
const postClinico = async (req = request, res = response) => {
  const { id_cli } = req.params;
  const uid_FILE = v4();
  try {
    const { formState } = req.body;
    const { id, ...restFormState } = formState;
    const dieta = new HistorialClinico({
      uid_file: uid_FILE,
      id_cli,
      ...restFormState,
    });
    await dieta.save();

    res.status(201).json({
      ok: true,
      uid_FILE: uid_FILE,
      id_hist_clinico: dieta.id,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: error,
    });
  }
};
const obtenerTODOHistorialClinicoxcliente = async (
  req = request,
  res = response
) => {
  const { id_cli } = req.params;
  try {
    const HcxCliente = await HistorialClinico.findAll({
      where: { id_cli: id_cli, flag: true },
      order: [["id", "DESC"]],
      include: [
        {
          model: ImagePT,
          required: true,
          // attributes: []
        },
      ],
    });
    console.log(HcxCliente);

    res.status(200).json({
      ok: true,
      HcxCliente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: error,
    });
  }
};
module.exports = {
  postDieta,
  deleteDieta,
  obtenerDietasxCliente,
  obtenerTODOHistorialClinicoxcliente,
  postClinico,
};
