const { Router } = require("express");
const {
  postComentario,
  postCoctactoEmergencia,
  postExtensionCongelamiento
} = require("../controller/servicios.controller");
const router = Router();
/**
 * /api/servicios
 */
router.post("/comentario/post", postComentario);
router.post("/contacto-emergencia/post", postCoctactoEmergencia);
router.post("/extension-congelamiento/post", postExtensionCongelamiento);

module.exports = router;
