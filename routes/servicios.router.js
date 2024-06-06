const { Router } = require("express");
const {
  postComentario,
  postCoctactoEmergencia,
} = require("../controller/servicios.controller");
const router = Router();
/**
 * /api/servicios
 */
router.post("/comentario/post", postComentario);
router.post("/contacto-emergencia/post", postCoctactoEmergencia);

module.exports = router;
