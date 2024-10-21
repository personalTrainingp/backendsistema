const { request, response } = require("express");
const { Articulos } = require("../models/Articulo");

const obtenerInventario = async (req = request, res = response) => {
  try {
    const articulo = await Articulos.findAll({
      where: { flag: true },
    });
    res.status(200).json({
      articulo,
    });
  } catch (error) {
    res.status(501).json({
      msg: "Error en obtenerinventario",
    });
  }
};
const registrarArticulo = async (req = request, res = response) => {
  try {
    const articulo = new Articulos(req.body);
    await articulo.save();
    res.status(201).json({
      msg: "Articulo registrado correctamente",
      articulo,
    });
  } catch (error) {
    res.status(501).json({
      msg: "Error en registrarArticulo",
    });
  }
};
const actualizarArticulo = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const articulo = await Articulos.findByPk(id);
    if (!articulo) {
      return res.status(404).json({
        msg: "El articulo no existe",
      });
    }
    articulo.update(req.body);
    res.status(200).json({
      msg: "Articulo actualizado correctamente",
      articulo,
    });
  } catch (error) {
    res.status(501).json({
      msg: "Error en actualizarArticulo",
    });
  }
};
const eliminarArticulo = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const articulo = await Articulos.findByPk(id);
    if (!articulo) {
      return res.status(404).json({
        msg: "El articulo no existe",
      });
    }
    articulo.update({ flag: false });
    await articulo.save();
    res.status(200).json({
      msg: "Articulo eliminado correctamente",
      articulo,
    });
  } catch (error) {
    res.status(501).json({
      msg: "Error en eliminarArticulo",
    });
  }
};
const obtenerArticuloxID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const articulo = await Articulos.findByPk(id, { where: { flag: true } });
    if (!articulo) {
      return res.status(404).json({
        msg: "El articulo no existe",
      });
    }
    res.status(200).json({
      articulo,
    });
  } catch (error) {
    res.status(501).json({
      msg: "Error en obtenerArticuloxID",
    });
  }
};
module.exports = {
  obtenerInventario,
  registrarArticulo,
  actualizarArticulo,
  eliminarArticulo,
  obtenerArticuloxID,
};
