const uuid = require("uuid");
const { Cliente, Empleado } = require("../models/Usuarios");
const { Comentario } = require("../models/Modelos");
const { ProgramaTraining } = require("../models/ProgramaTraining");
const options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
    0x67, 0x1c, 0x58, 0x36,
  ],
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date("2011-11-01").getTime(),
  nsecs: 5678,
};

const extraerComentarios = async (req, res, next) => {
  //Ver que datos se extrajo
  const saveComentarios = async (req, res) => {
    // const { comentario_com } = req.body;
    const uid_location = uuid.v4();
    //Todo los modelos que deben de tener comentarios, osea la localizacion de cada comentario
    const clientes = await Cliente.findAll({
      where: { uid_comentario: uid_location },
    });
    const empleado = await Empleado.findAll({
      where: { uid_comentario: uid_location },
    });
    const ventas = [];
    if (clientes.length > 0 || ventas.length > 0 || empleado.length > 0) {
      saveComentarios();
    }
    req.comentarioUnico_UID = uid_location;
    next();
  };
  saveComentarios(req, res);
};
const extraerContactoEmergencia = async (req, res, next) => {
  const saveContacEmerg = async (req, res) => {
    const uid_contactEmerg = uuid.v4();
    //Todo los modelos que deben de tener contactode emergencia, osea la localizacion de cada comentario
    const clientes = await Cliente.findAll({
      where: { uid_contactsEmergencia: uid_contactEmerg },
    });
    const empleado = await Empleado.findAll({
      where: { uid_contactsEmergencia: uid_contactEmerg },
    });
    if (clientes.length > 0 || empleado.length > 0) {
      saveContacEmerg();
    }
    req.contactoEmerg_UID = uid_contactEmerg;
    next();
  };
  saveContacEmerg(req, res);
};
const extraerUpload = async (req, res, next) => {
  const saveUpload = async (req, res) => {
    const uid_Upload = uuid.v4();
    //Todo los modelos que deben de tener el uid_image en el table
    const clientes = await Cliente.findAll({
      where: { uid_avatar: uid_Upload },
    });
    const programaTraining = await ProgramaTraining.findAll({
      where: { uid_avatar: uid_Upload },
    });
    const empleado = await Empleado.findAll({
      where: { uid_avatar: uid_Upload },
    });
    if (
      clientes.length > 0 ||
      empleado.length > 0 ||
      programaTraining.length > 0
    ) {
      saveUpload();
    }
    req.avatar_UID = uid_Upload;
    next();
  };
  saveUpload(req, res);
};
module.exports = {
  extraerComentarios,
  extraerContactoEmergencia,
  extraerUpload,
};
