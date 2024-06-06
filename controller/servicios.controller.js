const { request, response } = require("express");
const { Comentario, ContactoEmergencia } = require("../models/Modelos");
const uuid = require("uuid");

const postComentario = async (req, res) => {
  const { uid_usuario, comentario_com, uidLocation } = req.body;
  const fec_registro = new Date();
  try {
    const comentario = new Comentario({
      uid_usuario,
      comentario_com,
      fec_registro,
      uid_location: uidLocation,
      uid: uuid.v4(),
    });
    comentario.save();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
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

module.exports = {
  postComentario,
  postCoctactoEmergencia,
};
