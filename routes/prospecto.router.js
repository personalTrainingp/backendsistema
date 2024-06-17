const { Router } = require("express");
const {
  postProspecto,
  getProspectos,
  getProspectoPorID,
  putProspecto,
  deleteProspecto,
} = require("../controller/prospecto.controller");
const router = Router();
/*
/api/prospecto
*/

router.post("/post-prospecto", postProspecto);
router.get("/get-prospectos", getProspectos);
router.get("/get-prospecto/:id", getProspectoPorID);
router.put("/put-prospecto/:id", putProspecto);
router.put("/put-prospecto/:id", deleteProspecto);
module.exports = router;
