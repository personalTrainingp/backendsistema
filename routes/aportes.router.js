const { Router } = require("express");
const {
  postAporte,
  getTBAportes,
  getAportePorID,
  deleteAportexID,
  putAportexID,
} = require("../controller/aporte.controller");
const router = Router();
/*
/api/aporte
*/
//
router.get("/get-aporte/:id", getAportePorID);
router.post("/post-aporte", postAporte);
router.get("/get-aportes", getTBAportes);
router.put("/put-aporte/:id", putAportexID);
router.put("/delete-aporte/:id", deleteAportexID);
module.exports = router;
