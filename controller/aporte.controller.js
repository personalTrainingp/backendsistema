const { request, response } = require("express");
const { Aporte, Inversionista } = require("../models/Aportes");
const { Empleado } = require("../models/Usuarios");
const { Sequelize } = require("sequelize");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { typesCRUD } = require("../types/types");

const postAporte = async (req = request, res = response) => {
  const {
    id_inversionista,
    fecha_aporte,
    moneda,
    monto_aporte,
    id_forma_pago,
    id_banco,
    n_operacion,
    fec_comprobante,
    id_tipo_comprobante,
    n_comprobante,
    observacion,
    tipo_aporte,
  } = req.body;
  try {
    const aporte = new Aporte({
      id_inversionista,
      fecha_aporte,
      moneda,
      monto_aporte,
      n_operacion,
      id_forma_pago,
      id_banco,
      fec_comprobante,
      id_tipo_comprobante,
      n_comprobante,
      observacion,
      tipo_aporte,
    });
    await aporte.save();

    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.POST,
      observacion: `Se registro: El aporte de id ${aporte.id}`,
    };
    await capturarAUDIT(formAUDIT);
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
        "id_inversionista",
        "fecha_aporte",
        "moneda",
        "monto_aporte",
        "fec_comprobante",
        "observacion",
      ],
      include: [
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
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "No hay id",
      });
    }
    const aporte = await Aporte.findByPk(id);
    if (!aporte) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un Aporte con el id "${id}"`,
      });
    }
    await aporte.update({ flag: false });
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.DELETE,
      observacion: `Se elimino: El aporte de id ${aporte.id}`,
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: "Aporte eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller, hable con el administrador: ${error}`,
    });
  }
};
const putAportexID = async (req = request, res = response) => {
  try {
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.PUT,
      observacion: `Se actualizo: El aporte de id 22`,
    };
    await capturarAUDIT(formAUDIT);
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
