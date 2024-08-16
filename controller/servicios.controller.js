const { request, response } = require("express");
const { Comentario, ContactoEmergencia } = require("../models/Modelos");
const uuid = require("uuid");
const { ExtensionMembresia } = require("../models/ExtensionMembresia");
const { Usuario } = require("../models/Usuarios");
const { Sequelize } = require("sequelize");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { typesCRUD } = require("../types/types");

const postComentario = async (req, res) => {
  const { uid_usuario, comentario_com, uid_location } = req.body;
  try {
    const comentario = new Comentario({
      uid_usuario,
      comentario_com,
      fec_registro: new Date(),
      uid_location,
      uid: uuid.v4(),
    });
    await comentario.save();
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.POST,
      observacion: `Se agrego: El comentario de id ${comentario.id_comentario}`,
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};
const getComentarioxLOCATION = async (req = request, res = response) => {
  const { location } = req.params;
  try {
    const comentarios = await Comentario.findAll({
      where: { uid_location: location, flag: true },
      attributes: ["fec_registro", "id_comentario", "comentario_com"],
      order: [["fec_registro", "desc"]],
      include: [
        {
          model: Usuario,
          attributes: [
            [
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("nombres_user"),
                " ",
                Sequelize.col("apellidos_user")
              ),
              "nombres_apellidos_user",
            ],
            "uid",
          ],
        },
      ],
    });
    res.status(200).json({
      comentarios,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      msg: `Error hable con el sistemas: getComentarioxLOCATION: ${error}`,
    });
  }
};
const getComentarioxID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const comentario = await Comentario.findByPk(id, { flag: true });
    res.status(200).json(comentario);
  } catch (error) {
    res.status(200).json({
      msg: "Error hable con el sistemas: getComentarioxID",
    });
  }
};
const putComentarioxID = async (req = request, res = response) => {
  const { id_comentario } = req.params;
  try {
    const comentario = await Comentario.findByPk(id_comentario, { flag: true });
    if (!comentario) {
      return res.status(404).json({
        msg: `No existe un comentario con el id "${id}"`,
      });
    }
    await comentario.update(req.body);
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.PUT,
      observacion: `Se actualizo: El comentario de id ${comentario.id_comentario}`,
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    res.status(200).json({
      msg: "Error hable con el sistemas: putComentarioxID",
    });
  }
};
const deleteComentarioxID = async (req = request, res = response) => {
  const { id_comentario } = req.params;
  try {
    const comentario = await Comentario.findByPk(id_comentario, { flag: true });
    if (!comentario) {
      return res.status(404).json({
        msg: `No existe un comentario con el id "${id_comentario}"`,
      });
    }
    await comentario.update({ flag: false });
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.DELETE,
      observacion: `Se Elimino: El comentario de id ${comentario.id_comentario}`,
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: "success",
    });
  } catch (error) {
    res.status(200).json({
      msg: "Error hable con el sistemas: deleteComentarioxID",
    });
  }
};

const postCoctactoEmergencia = async (req, res) => {
  const { contactosDeEmergencia, uidLocation } = req.body;
  try {
    for (let id = 0; id < contactosDeEmergencia.length; id++) {
      const element = contactosDeEmergencia[id];
      const contacto = new ContactoEmergencia({
        nombreContacto_ce: element.nombresCompletos_emerg,
        tel_ce: element.tel_emerg,
        relacion_ce: element.relacion_emerg,
        uid: uuid.v4(),
        uid_location: uidLocation,
      });
      console.log(contacto);
      contacto.save();
    }
    // const contacto = new ContactoEmergencia(...contactosDeEmergencia);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};
const postExtensionCongelamiento = async (req, res) => {};
const postExtensionRegalo = async (req, res) => {};
const getExtensionesxTIPO = async (req, res) => {};

module.exports = {
  postComentario,
  postCoctactoEmergencia,
  postExtensionCongelamiento,
  postExtensionRegalo,
  getExtensionesxTIPO,
  getComentarioxLOCATION,
  getComentarioxID,
  putComentarioxID,
  deleteComentarioxID,
};
