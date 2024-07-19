const { request, response } = require("express");
const { Aporte, Inversionista } = require("../models/Aportes");
const { Empleado } = require("../models/Usuarios");
const { Sequelize } = require("sequelize");

const postAporte = async (req = request, res = response) => {
  const {
    id_inversionista,
    grupo,
    fecha_aporte,
    moneda,
    monto_aporte,
    id_receptor,
    id_tipo_aporte,
    id_forma_pago,
    id_banco,
    fec_comprobante,
    id_tipo_comprobante,
    n_comprobante,
    observacion,
  } = req.body;
  try {
    const aporte = new Aporte({
      id_inversionista,
      grupo,
      fecha_aporte,
      moneda,
      monto_aporte,
      id_receptor,
      id_tipo_aporte,
      id_forma_pago,
      id_banco,
      fec_comprobante,
      id_tipo_comprobante,
      n_comprobante,
      observacion,
    });
    await aporte.save();
    res.status(200).json({ msg: "Success", aporte });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getTBAportes, hable con el administrador: ${error}`,
    });
  }
};
const getTBAportes = async (req = request, res = response) => {
  try {
    const aportes = await Aporte.findAll({
      attributes: [
        "id",
        "grupo",
        "id_inversionista",
        "fecha_aporte",
        "moneda",
        "monto_aporte",
        "id_receptor",
      ],
      include: [
        {
          model: Empleado,
          attributes: [
            [
              Sequelize.literal(
                "CONCAT(nombre_empl, ' ', apPaterno_empl, ' ', apMaterno_empl)"
              ),
              "nombres_apellidos_empl",
            ],
          ],
        },
        {
          model: Inversionista,
          attributes: ["nombres_completos"],
        },
      ],
    });
    res.status(200).json({ msg: "Success", aportes });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getTBAportes, hable con el administrador: ${error}`,
    });
  }
};
const getAportePorID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    console.log("estoy aca");
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "No hay id",
      });
    }
    const aporte = await Aporte.findOne({
      where: { flag: true, id: id },
    });
    if (!aporte) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un Aporte con el id "${id}"`,
      });
    }
    res.status(200).json({
      aporte,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getAportePorID, hable con el administrador: ${error}`,
    });
  }
};
const deleteAportexID = async (req = request, res = response) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller, hable con el administrador: ${error}`,
    });
  }
};
const putAportexID = async (req = request, res = response) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  postAporte,
  getTBAportes,
  getAportePorID,
  putAportexID,
  deleteAportexID,
};
