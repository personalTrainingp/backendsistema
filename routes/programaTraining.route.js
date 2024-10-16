const { Router } = require("express");
const {
  postProgramaTraining,
  getTBProgramaTraining,
  putProgramaTraining,
  postHorarioProgramaPT,
  deleteHorarioProgramasPT,
  putHorarioProgramasPT,
  getHorariosProgramasPT,
  deleteProgramaTraining,
  postSemanaProgramaPT,
  putSemanaProgramasPT,
  deleteSemanaProgramasPT,
  postTarifaProgramaPT,
  putTarifaProgramasPT,
  deleteTarifaProgramasPT,
  getProgramaTrainingxUID,
  getHorariosTBPrograma,
  getSemanaProgramasPT,
  getSemanaxID,
  postSesiones
} = require("../controller/programaTraining.controller");
const { extraerUpload } = require("../middlewares/extraerComentarios");
const router = Router();
/**
 * /api/programaTraining
 */
router.post("/post_pgm", extraerUpload, postProgramaTraining);
router.get("/get_tb_pgm", getTBProgramaTraining);
router.get("/get_pgm/:uid", getProgramaTrainingxUID);
router.put("/put_pgm/:id", putProgramaTraining);
router.put("/delete_pgm/:id", deleteProgramaTraining);

//Horarios de programa
router.post("/horario/post_pgm", postHorarioProgramaPT);
router.get("/horario/get_tb_pgm/:uidPgm", getHorariosTBPrograma);
router.put("/horario/put_pgm/:id_hr", putHorarioProgramasPT);
router.put("/horario/delete_pgm/:id_hr", deleteHorarioProgramasPT);

//Semanas de programa
router.post("/sesiones/post-sesion", postSesiones)

router.post("/semana/post_pgm", postSemanaProgramaPT);
router.get("/semana/get_tb_pgm/:id_pgm", getSemanaProgramasPT);
router.get("/semana/get_sm/:id_sm", getSemanaxID);
router.put("/semana/put_pgm/:id_sm", putSemanaProgramasPT);
router.put("/semana/delete_pgm/:id_sm", deleteSemanaProgramasPT);

//Tarifa de programa
router.post("/tarifa/post_pgm", postTarifaProgramaPT);
router.put("/tarifa/put_pgm/:id_tt", putTarifaProgramasPT);
router.put("/tarifa/delete_pgm/:id_tt", deleteTarifaProgramasPT);

module.exports = router;
