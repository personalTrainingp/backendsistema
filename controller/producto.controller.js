const { request, response } = require("express");
const { Producto } = require("../models/Producto");
const uid = require("uuid");
const { eliminarCaracter } = require("../helpers/isFormat");
const postProducto = async (req = request, res = response) => {
  const {
    id_marca,
    id_categoria,
    id_presentacion,
    codigo_lote,
    codigo_producto,
    codigo_contable,
    id_prov,
    nombre_producto,
    prec_venta,
    prec_compra,
    stock_minimo,
    stock_producto,
    ubicacion_producto,
    fec_vencimiento,
    estado_producto,
  } = req.body;
  try {
    const producto = new Producto({
      uid: uid.v4(),
      id_marca,
      id_categoria,
      id_presentacion,
      codigo_lote,
      codigo_producto,
      codigo_contable,
      id_prov,
      nombre_producto,
      prec_venta: eliminarCaracter(prec_venta, ","),
      prec_compra: eliminarCaracter(prec_compra, ","),
      stock_minimo,
      stock_producto,
      ubicacion_producto,
      fec_vencimiento,
      estado_producto,
    });
    producto.save();
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getProducto = async (req = request, res = response) => {};
const getTBProductos = async (req = request, res = response) => {
  try {
    const producto = await Producto.findAll({
      where: { flag: true },
      attributes: [
        "nombre_producto",
        "prec_venta",
        "prec_compra",
        "stock_producto",
        ["estado_product", "estado"],
        "id",
      ],
    });
    res.status(200).json({
      msg: true,
      producto,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema, getTBProductos",
    });
  }
};
const updateProducto = async (req = request, res = response) => {};
const deleteProducto = async (req = request, res = response) => {};
module.exports = {
  postProducto,
  getProducto,
  getTBProductos,
  updateProducto,
  deleteProducto,
};
