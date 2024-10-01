const { Router } = require("express");
const {
  postComentario,
  postCoctactoEmergencia,
  postExtensionCongelamiento,
  getComentarioxLOCATION,
  getComentarioxID,
  putComentarioxID,
  deleteComentarioxID,
} = require("../controller/servicios.controller");
const router = Router();
/**
 * /api/servicios
 */
router.post("/comentario/post", postComentario);
router.get(`/comentario/:location`, getComentarioxLOCATION);
router.get(`/comentario/:id`, getComentarioxID);
router.put(`/comentario/put/:id_comentario`, putComentarioxID);
router.put(`/comentario/delete/:id_comentario`, deleteComentarioxID);

router.post("/contacto-emergencia/post", postCoctactoEmergencia);
router.post("/extension-congelamiento/post", postExtensionCongelamiento);



module.exports = router;
