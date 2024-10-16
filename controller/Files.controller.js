const { request, response } = require("express");
const { Files, ImagePT } = require("../models/Image");
const uuid = require("uuid");
const postFiles = async (req = request, res = response) => {
  try {
    const { uid_file } = req.params;
    const UID = uuid.v4();
    const { id_tipo_file, observacion } = req.body;

    const file = new Files({
      id_tipo_file,
      uid_Location: uid_file,
      observacion,
      uid_file: UID,
      fecha_file: new Date(),
    });
    await file.save();
    res.status(201).json({
      ok: true,
      UID,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema (postFiles)",
    });
  }
};
const deleteFilexID = async (req = request, res = response) => {
  try {
    const { id_file } = req.params;
    console.log(id_file);

    const file = await Files.findOne({ where: { id: id_file } });
    file.update({ flag: false });
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema (deleteFiles)",
    });
  }
};
const obtenerFilesxUIDFILE = async (req = request, res = response) => {
  try {
    const { uid_Location } = req.params;
    const files = await Files.findAll({
      where: { uid_Location, flag: true },
      order: [["fecha_file", "desc"]],
      include: [
        {
          model: ImagePT,
          attributes: ["name_image"],
          where: { flag: true },
        },
      ],
    });
    res.status(200).json({
      all: files,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema (obtenerFilesxUIDFILE)",
    });
  }
};
module.exports = {
  postFiles,
  deleteFilexID,
  obtenerFilesxUIDFILE,
};
