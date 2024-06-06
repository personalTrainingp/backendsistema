const { response, request } = require("express");
const { Proveedor } = require("../models/Proveedor");
const uid = require("uuid");

const getTBProveedores = async (req = request, res = response) => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: [
        "razon_social_prov",
        "ruc_prov",
        "cel_prov",
        "nombre_vend_prov",
        ["estado_prov", "estado"],
        "id",
      ],
      where: { flag: true },
    });
    res.status(200).json({
      msg: true,
      proveedores,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const PostProveedores = async (req, res) => {
  const {
    ruc_prov,
    razon_social_prov,
    tel_prov,
    cel_prov,
    email_prov,
    direc_prov,
    estado_prov,
    dni_vend_prov,
    nombre_vend_prov,
    cel_vend_prov,
    email_vend_prov,
  } = req.body;
  try {
    const proveedor = new Proveedor({
      uid: uid.v4(),
      ruc_prov,
      razon_social_prov,
      tel_prov,
      cel_prov,
      email_prov,
      direc_prov,
      estado_prov,
      dni_vend_prov,
      nombre_vend_prov,
      cel_vend_prov,
      email_vend_prov,
    });
    await proveedor.save();
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "No hay id",
      });
    }
    const proveedor = await Proveedor.findOne({
      where: { flag: true, id: id },
    });
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    res.status(200).json({
      proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const deleteProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id, { flag: true });
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    proveedor.update({ flag: false });
    res.status(200).json({
      msg: proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error al eliminar el proveedor. Hable con el encargado de sistema",
      error: error.message,
    });
  }
};
const updateProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: "No hay ningun proveedor con ese id",
      });
    }

    proveedor.update(req.body);
    res.status(200).json({
      msg: proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error al eliminar el proveedor. Hable con el encargado de sistema",
      error: error.message,
    });
  }
};
module.exports = {
  getTBProveedores,
  PostProveedores,
  getProveedor,
  deleteProveedor,
  updateProveedor,
};
