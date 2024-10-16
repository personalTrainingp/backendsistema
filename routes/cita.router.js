const { Router } = require("express");
const {
  postCita,
  getCitas,
  getCitaporID,
  deleteCita,
  putCita,
  getCitasxServicios,
} = require("../controller/cita.controller.js");
const { mailNutricion } = require("../middlewares/mails.js");
// const {
//   verifyWhatsAppNumber,
//   WspCitasServicio,
// } = require("../middlewares/WspMessageStore.js");
const router = Router();
/*
/api/cita
*/

router.get("/get-citas/:tipo_serv", getCitasxServicios);
router.post(
  "/post-cita",
  // verifyWhatsAppNumber,
  // WspCitasServicio
  // mailNutricion,
  postCita
);
router.get("/get-cita/:id", getCitaporID);
router.put("/put-cita/:id", putCita);
router.put("/delete-cita/:id", deleteCita);
// router.get("/get-citas", getCitas);
module.exports = router;
