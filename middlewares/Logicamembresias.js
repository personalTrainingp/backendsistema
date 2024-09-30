const { SemanasTraining } = require("../models/ProgramaTraining");
const { Cliente } = require("../models/Usuarios");
const { Venta, detalleVenta_membresias } = require("../models/Venta");

const ultimaMembresiaxCli = async (id_cli) => {
  const venta = await Venta.findOne({
    where: { id_cli: id_cli },
    order: [["fecha_venta", "DESC"]],
  });
  console.log(venta, "en venta");

  if (venta === null) return {};
  const membresia = await detalleVenta_membresias.findOne({
    where: { id_venta: venta?.id },
  });
  console.log(membresia);

  return membresia;
};
const detalle_sesionxMembresia = async (id_membresia) => {
  const detalle_membresia = await detalleVenta_membresias.findOne({
    where: { id: id_membresia },
  });
  const sesion = await SemanasTraining.findOne({
    where: { id_st: detalle_membresia.id_st },
  });
  return sesion;
};
module.exports = {
  ultimaMembresiaxCli,
  detalle_sesionxMembresia,
};
