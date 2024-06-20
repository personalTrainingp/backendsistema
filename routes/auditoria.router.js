const { Router } = require("express");
const { postAudit, getTBAudit } = require("../controller/auditoria.controller");
const router = Router();
/*
/api/auditoria
*/

router.post("/post-prospecto", postAudit);
router.get("/get-auditoria", getTBAudit);
module.exports = router;
