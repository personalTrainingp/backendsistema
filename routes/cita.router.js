const { Router } = require("express");
const { postCita, getCitas } = require("../controller/cita.controller.js");
const router = Router();
/*
/api/venta
*/

router.post("/post-cita", postCita);
router.get("/get-ventas", getCitas);
module.exports = router;
