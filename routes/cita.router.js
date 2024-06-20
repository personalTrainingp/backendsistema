const { Router } = require("express");
const {
  postCita,
  getCitas,
  getCitaporID,
  deleteCita,
  putCita,
} = require("../controller/cita.controller.js");
const router = Router();
/*
/api/venta
*/

router.post("/post-cita", postCita);
router.get("/get-cita/:id", getCitaporID);
router.put("/put-cita/:id", putCita);
router.put("/delete-cita/:id", deleteCita);
router.get("/get-citas", getCitas);
module.exports = router;
