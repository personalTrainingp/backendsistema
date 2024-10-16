const { Router } = require("express");
const {
  // postFitology,
  // postNutricion,
  // getTBFitology,
  // getTBNutricion,
  // getOneServicio,
  // deleteOneServicio,
  // updateOneServicio,
  postServicioCita,
  getServicioCita,
  getServicioCitaxID,
  putServicioCitaxID,
  deleteServicioCitaxID,
} = require("../controller/serviciosPT.controller.js");
const router = Router();
/**
 * /api/serviciospt
 */
// router.post("/servFitology/post", postFitology);
// router.get("servFitology/getTB", getTBFitology);

// router.post("/servNutricion/post", postNutricion);
// router.get("/servNutricion/getTB", getTBNutricion);

// router.get("/servicios/getOne/:id", getOneServicio);
// router.put("/servicios/delete/:id", deleteOneServicio);
// router.put("/servicios/update/:id", updateOneServicio);

router.post("/serviciocita/post/:tipo_serv", postServicioCita);
router.get("/serviciocita/:tipo_serv", getServicioCita);
router.get("/serviciocita/get/:id", getServicioCitaxID);
router.put("/serviciocita/put/:id", putServicioCitaxID);
router.delete("/serviciocita/delete/:id", deleteServicioCitaxID);

module.exports = router;
