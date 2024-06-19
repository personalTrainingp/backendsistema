const { Router } = require("express");
const { postAudit, getTBAudit } = require("../controller/auditoria.controller");
const router = Router();
/*
/api/prospecto
*/

router.post("/post-prospecto", postAudit);
router.get("/get-prospectos", getTBAudit);
module.exports = router;
