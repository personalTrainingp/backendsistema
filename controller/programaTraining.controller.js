const { request, response } = require("express");
const {
  ProgramaTraining,
  SemanasTraining,
  TarifaTraining,
} = require("../models/ProgramaTraining");
const { db } = require("../database/sequelizeConnection");
const { Sequelize, where } = require("sequelize");
const { ImagePT } = require("../models/Image");
const { HorarioProgramaPT } = require("../models/HorarioProgramaPT");
const uid = require("uuid");
const {
  ultimaMembresiaxCli,
  detalle_sesionxMembresia,
} = require("../middlewares/Logicamembresias");
const { detalleVenta_membresias } = require("../models/Venta");

const postProgramaTraining = async (req = request, res = response) => {
  const { nombre_pgm, desc_pgm, sigla_pgm, estado_pgm } = req.body;
  const { avatar_UID } = req;
  try {
    const pgm = new ProgramaTraining({
      name_pgm: nombre_pgm,
      uid_avatar: avatar_UID,
      uid: uid.v4(),
      desc_pgm,
      sigla_pgm,
      estado_pgm,
    });
    await pgm.save();
    res.status(200).json(pgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};
const getTBProgramaTraining = async (req, res) => {
  try {
    // console.log("pasa");
    // await db.sync({ force: true });
    const pgmTb = await ProgramaTraining.findAll({
      attributes: [
        "id_pgm",
        "uid",
        "uid_avatar",
        "name_pgm",
        "desc_pgm",
        "sigla_pgm",
        "estado_pgm",
      ], // Ajusta los atributos que deseas seleccionar
      where: { flag: true },
      include: [
        {
          model: ImagePT,
          attributes: ["name_image"],
        },
        {
          model: HorarioProgramaPT,
          attributes: ["id_horarioPgm"],
        },
        {
          model: SemanasTraining,
          attributes: ["id_st"],
        },
      ],
    });
    res.status(200).json(pgmTb);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller(getTB) de programa, hable con el administrador: ${error}`,
    });
  }
};
const putProgramaTraining = async (req = request, res = response) => {
  const { id } = req.params;
  const { desc_pgm, name_pgm, sigla_pgm, estado_pgm } = req.body;
  try {
    const pgm = await ProgramaTraining.findByPk(id, { flag: true });
    if (!pgm) {
      return res.status(404).json({
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    await pgm.update(req.body);
    res.status(200).json(pgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(putPT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const deleteProgramaTraining = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const pgm = await ProgramaTraining.findByPk(id, { flag: true });
    if (!pgm) {
      return res.status(404).json({
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    pgm.update({ flag: false });
    res.status(200).json({
      msg: "programa eliminado con exito",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(deletePT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getProgramaTrainingxUID = async (req = request, res = response) => {
  try {
    const { uid } = req.params;
    const programa = await ProgramaTraining.findOne({
      where: { uid: uid, flag: true },
      include: [
        {
          model: ImagePT,
          attributes: ["name_image"],
        },
        {
          model: HorarioProgramaPT,
          attributes: [
            "id_horarioPgm",
            "time_HorarioPgm",
            "aforo_HorarioPgm",
            "trainer_HorarioPgm",
            "estado_HorarioPgm",
          ],
        },
        {
          model: SemanasTraining,
          attributes: [
            "id_st",
            "id_pgm",
            "semanas_st",
            "congelamiento_st",
            "nutricion_st",
            "estado_st",
          ],
          include: [
            {
              model: TarifaTraining,
              attributes: [
                "id_tt",
                "id_st",
                "nombreTarifa_tt",
                "descripcionTarifa_tt",
                "tarifaCash_tt",
                "estado_tt",
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      programa,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};

//horarios programas
const postHorarioProgramaPT = async (req = request, res = response) => {
  const {
    id_pgm,
    time_HorarioPgm,
    aforo_HorarioPgm,
    trainer_HorarioPgm,
    estado_HorarioPgm,
  } = req.body;
  const hrPgm = new HorarioProgramaPT({
    id_pgm,
    uid: uid.v4(),
    time_HorarioPgm,
    aforo_HorarioPgm,
    trainer_HorarioPgm,
    estado_HorarioPgm,
  });
  // console.log(hrPgm);
  await hrPgm.save();
  res.json({
    msg: "en post de horario",
    hrPgm,
  });
};
const getHorariosTBPrograma = async (req = request, res = response) => {
  const { uidPgm } = req.params;
  try {
    console.log(uidPgm);
    const horarios = await HorarioProgramaPT.findAll({
      where: { uid_pgm: uidPgm, flag: true },
    });
    res.status(200).json({
      horarios,
      msg: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getHorariosTBPrograma) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getHorariosProgramasPTxpgm = async (req = request, res = response) => {};
const putHorarioProgramasPT = async (req = request, res = response) => {
  const { id_hr } = req.params;
  try {
    const hrPgm = await HorarioProgramaPT.findByPk(id_hr, { flag: true });
    if (!hrPgm) {
      return res.status(404).json({
        msg: `No existe un horario de programa con el id "${id_hr}"`,
      });
    }
    await hrPgm.update(req.body);
    res.status(200).json(hrPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(putPT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const deleteHorarioProgramasPT = async (req = request, res = response) => {
  const { id_hr } = req.params;
  try {
    const hrPgm = await HorarioProgramaPT.findByPk(id_hr, { flag: true });
    if (!hrPgm) {
      return res.status(404).json({
        msg: `No existe un horario de programa con el id "${id}"`,
      });
    }
    // console.log("horario eliminado", hrPgm);
    await hrPgm.update({ flag: false });
    res.status(200).json(hrPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(deletePT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getHorariosProgramasPT = async (req = request, res = response) => {
  try {
    const hrPgm = await HorarioProgramaPT.findAll({ where: { flag: true } });
    res.json(hrPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getTB) de horario programa, hable con el administrador: ${error}`,
    });
  }
};

//Semanas programa
const postSemanaProgramaPT = async (req = request, res = response) => {
  const { id_pgm, semanas_st, congelamiento_st, nutricion_st, estado_st } =
    req.body;
  const semanaPgm = new SemanasTraining({
    uid: uid.v4(),
    semanas_st,
    congelamiento_st,
    nutricion_st,
    estado_st,
    id_pgm,
  });
  // console.log(hrPgm);
  await semanaPgm.save();
  res.json({
    msg: "en post de semanas",
    semanaPgm,
  });
};
const getSemanaProgramasPT = async (req = request, res = response) => {
  const { id_pgm } = req.params;
  try {
    const semanasPGM = await SemanasTraining.findAll({ where: { id_pgm } });
    res.status(200).json(semanasPGM);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getSemanaProgramasPT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const putSemanaProgramasPT = async (req = request, res = response) => {
  const { id_sm } = req.params;
  try {
    const SmPgm = await SemanasTraining.findByPk(id_sm, { flag: true });
    if (!SmPgm) {
      return res.status(404).json({
        msg: `No existe una Semana de programa con el id "${id_sm}"`,
      });
    }
    await SmPgm.update(req.body);
    res.status(200).json(SmPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(putPT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const deleteSemanaProgramasPT = async (req = request, res = response) => {
  const { id_sm } = req.params;
  try {
    const smPgm = await SemanasTraining.findByPk(id_sm, { flag: true });
    if (!smPgm) {
      return res.status(404).json({
        msg: `No existe un semana de programa con el id "${id_sm}"`,
      });
    }
    // console.log("horario eliminado", hrPgm);
    await smPgm.update({ flag: false });
    res.status(200).json(smPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(deletePT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const getSemanaxID = async (req = request, res = response) => {
  try {
    console.log("id_sm");
    const { id_sm } = req.params;
    const smPgm = await SemanasTraining.findOne({
      where: { id_st: id_sm },
      include: [
        {
          model: TarifaTraining,
          attributes: [
            "nombreTarifa_tt",
            "descripcionTarifa_tt",
            "tarifaCash_tt",
            "estado_tt",
          ],
        },
      ],
    });
    if (!smPgm) {
      return res.status(404).json({
        msg: `No existe un semana de programa con el id "${id_sm}"`,
      });
    }
    res.status(200).json(smPgm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getSemanaxID) de programa, hable con el administrador: ${error}`,
    });
  }
};

//Tarifa programa
const getTarifasTB = async () => {
  try {
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(getTarifasTB) de programa, hable con el administrador: ${error}`,
    });
  }
};
const postSesiones = async (req = request, res = response) => {
  try {
    const membresia = await ultimaMembresiaxCli(
      Number(req.body.detalle_cli_modelo.id_cli)
    );

    if (membresia === null) {
      return res.status(200).json({
        ok: true,
      });
    }
    const detalle_sesion = await detalle_sesionxMembresia(
      membresia["detalle_ventaMembresia.id"]
    );
    
    const { sesiones, id_pgm } = req.body.dataVenta.detalle_traspaso[0];
    const nuevaSesion = new SemanasTraining({
      semanas_st: (sesiones / 5).toFixed(0),
      id_pgm,
      congelamiento_st: detalle_sesion.congelamiento_st,
      nutricion_st: detalle_sesion.nutricion_st,
      estado_st: false,
      uid: uid.v4(),
      sesiones: sesiones,
    });
    await nuevaSesion.save();
    const tarifaNueva = new TarifaTraining({
      id_st: nuevaSesion.id_st,
      nombreTarifa_tt: "TARIFA APERTURA",
      descripcionTarifa_tt: "TARIFA CREADA POR VENTAS",
      tarifaCash_tt: 0,
      estado_tt: false,
    });
    await tarifaNueva.save();

    res.status(200).json({
      ok: true,
      tt: "algo pasa?",
      id_tt: tarifaNueva.id_tt,
      id_st: nuevaSesion.id_st,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: `Error en el servidor, en controller(post sesiones) de programa, hable con el administrador: ${error}`,
    });
  }
};
const postTarifaProgramaPT = async (req = request, res = response) => {
  const {
    id_st,
    nombreTarifa_tt,
    descripcionTarifa_tt,
    tarifaCash_tt,
    estado_tt,
  } = req.body;
  const TarifaSm = new TarifaTraining({
    uid: uid.v4(),
    nombreTarifa_tt,
    descripcionTarifa_tt,
    tarifaCash_tt,
    estado_tt,
    id_st,
  });
  await TarifaSm.save();
  res.json({
    msg: "en post de tarifa de semana",
    tarifaSm: TarifaSm,
  });
};
const putTarifaProgramasPT = async (req = request, res = response) => {
  const { id_tt } = req.params;
  try {
    const ttSm = await TarifaTraining.findByPk(id_tt, { flag: true });
    if (!ttSm) {
      return res.status(404).json({
        msg: `No existe una Semana de programa con el id "${id_tt}"`,
      });
    }
    await ttSm.update(req.body);
    res.status(200).json(ttSm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(putPT) de programa, hable con el administrador: ${error}`,
    });
  }
};
const deleteTarifaProgramasPT = async (req = request, res = response) => {
  const { id_tt } = req.params;
  try {
    const ttSm = await TarifaTraining.findByPk(id_tt, { flag: true });
    if (!ttSm) {
      return res.status(404).json({
        msg: `No existe un semana de programa con el id "${id_tt}"`,
      });
    }
    // console.log("horario eliminado", hrPgm);
    await ttSm.update({ flag: false });
    res.status(200).json(ttSm);
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller(deletePT) de programa, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  postProgramaTraining,
  getTBProgramaTraining,
  putProgramaTraining,
  deleteProgramaTraining,
  getProgramaTrainingxUID,
  //horarios programas
  postHorarioProgramaPT,
  getHorariosTBPrograma,
  getHorariosProgramasPTxpgm,
  putHorarioProgramasPT,
  deleteHorarioProgramasPT,
  getHorariosProgramasPT,

  //Semanas programas
  postSesiones,
  postSemanaProgramaPT,
  getSemanaProgramasPT,
  putSemanaProgramasPT,
  deleteSemanaProgramasPT,
  getSemanaxID,

  //Tarifa programas
  postTarifaProgramaPT,
  putTarifaProgramasPT,
  deleteTarifaProgramasPT,
};
