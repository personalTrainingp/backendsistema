const { request, response } = require("express");
const { ExtensionMembresia } = require("../models/ExtensionMembresia");

const obtenerExtensionesPorTipo = async (req = request, res = response) => {
  const { tipo } = req.params;

  try {
    const extensiones = await ExtensionMembresia.findAll({
      where: { tipo_extension: tipo },
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "tipo_extension",
        "extension_inicio",
        "extension_fin",
        "observacion",
        "dias_habiles",
      ],
    });
    res.status(200).json({
      extensiones,
    });
  } catch (error) {
    console.log(error);
    res.status(505).json({
      msg: `Problemas en obtenerExtensionesPorTipo: ${error}`,
    });
  }
};
const postExtensionPorTipoPorId = async (req = request, res = response) => {
  const { tipo, idventa } = req.params;
  const { observacion, dias_habiles, extension_inicio, extension_fin } =
    req.body;
  try {
    const extension = new ExtensionMembresia({
      tipo_extension: tipo,
      dias_habiles,
      observacion,
      extension_inicio,
      extension_fin,
      id_venta: idventa,
    });
    await extension.save();
    res.status(200).json({
      msg: `Extension agregado con exito`,
    });
  } catch (error) {
    console.log(error);
    res.status(505).json({
      msg: `Problemas en obtenerExtensionesPorTipo: ${error}`,
    });
  }
};

const obtenerExtensionPorId = (req = request, res = response) => {};
const putExtension = (req = request, res = response) => {};
const removeExtension = (req = request, res = response) => {};

module.exports = {
  obtenerExtensionesPorTipo,
  postExtensionPorTipoPorId,
  obtenerExtensionPorId,
  putExtension,
  removeExtension,
};
