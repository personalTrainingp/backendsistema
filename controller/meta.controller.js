const { request, response } = require("express");
const { Meta, MetaVSAsesor } = require("../models/Meta");
const uid = require("uuid");
const { Empleado } = require("../models/Usuarios");

const postMeta = async (req = request, res = response) => {
  const { nombre_meta, meta_meta, bono, fec_inicio, fec_fin } = req.body;
  try {
    const meta = new Meta({
      nombre_meta,
      meta: meta_meta,
      bono: bono,
      fec_fin,
      fec_inicio,
      status_meta: 45,
      uid: uid.v4(),
    });
    meta.save();
    res.status(200).json({
      meta,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(postMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getOneMeta = async (req = request, res = response) => {
  const { uid_meta } = req.params;
  try {
    const meta = await Meta.findAll({ where: { uid: uid_meta } });
    res.status(200).json(meta);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getOneMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getMetas = async (req, res) => {
  try {
    const metas = await Meta.findAll({
      where: { flag: true },
      attributes: [
        "nombre_meta",
        "meta",
        "bono",
        "fec_inicio",
        "fec_fin",
        "status_meta",
        "id_meta",
      ],
    });
    res.status(200).json({
      metas,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getOneMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
const updateOneMeta = async (req = request, res = response) => {};

//META VS ASESOR
const postMetaAsesor = async (req = request, res = response) => {
  const { meta_asesor, id_asesor } = req.body;
  const { id_meta } = req.params;
  try {
    const meta = new MetaVSAsesor({
      meta_asesor,
      id_asesor,
      id_meta,
    });
    meta.save();
    res.status(200).json({
      meta,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(postMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getMetasAsesorxMeta = async (req, res) => {
  const { id_meta } = req.params;
  try {
    const metavsAsesor = await MetaVSAsesor.findAll({
      where: { id_meta: id_meta, flag: true },
      attributes: ["meta_asesor", "id_asesor", "status_meta"],
    });
    res.status(200).json({
      metavsAsesor,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getMetaAsesorxMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
const deleteOneMetaAsesor = async (req, res) => {
  const { id_meta_asesor } = req.params;
  try {
    // const metaAsesor = await MetaVSAsesor.findOne({ where: { meta_asesor } });
    MetaVSAsesor.destroy({ where: { id: id_meta_asesor } });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getMetaAsesorxMeta) de programa, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  postMeta,
  getOneMeta,
  getMetas,
  updateOneMeta,
  getMetasAsesorxMeta,
  //meta_asesor
  postMetaAsesor,
  deleteOneMetaAsesor,
};
