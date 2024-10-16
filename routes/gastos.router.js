const { Router } = require("express");

const {
  postGasto,
  getGastos,
  getGasto,
  putGasto,
  deleteGasto,
  getProveedoresGastos_SinRep,
} = require("../controller/gastos.controller");
const router = Router();
/**
 * [API Documentation]
 * /api/egreso
 */

//RUTAS - GASTO FIJO
// router.get("/get_gfs", obtenerTB_GF);
// router.get("/get_gf/:id", obtener_GFxID);
// router.post("/post_gf", post_GF);
// router.put("/delete_gf/:id", eliminar_GF);
// router.put("/put_gf/:id", put_GF);

//RUTAS - GASTO VARIABLES
// router.get("/get_gvs", obtenerTB_GV);
// router.get("/get_gv/:id", obtener_GVxID);
// router.post("/post_gv", post_GV);
// router.put("/delete_gv/:id", eliminar_GV);
// router.put("/put_gv/:id", put_GV);

router.post("/post-egreso", postGasto);
router.get("/get-egresos/:id_enterp", getGastos);
router.get("/get-egreso/:id", getGasto);
router.put("/put-egreso/:id", putGasto);
router.put("/delete-egreso/:id", deleteGasto);

router.get("/get-proveedores-unicos", getProveedoresGastos_SinRep)
module.exports = router;
