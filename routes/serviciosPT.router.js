const { Router } = require("express");
const {
  postFitology,
  postNutricion,
  getTBFitology,
  getTBNutricion,
  getOneServicio,
  deleteOneServicio,
  updateOneServicio,
} = require("../controller/serviciosPT.controller.js");
const router = Router();
/**
 * /api/serviciosPT
 */
router.post("/servFitology/post", postFitology);
router.get("servFitology/getTB", getTBFitology);

router.post("/servNutricion/post", postNutricion);
router.get("/servNutricion/getTB", getTBNutricion);

router.get("/servicios/getOne/:id", getOneServicio);
router.put("/servicios/delete/:id", deleteOneServicio);
router.put("/servicios/update/:id", updateOneServicio);

module.exports = router;
