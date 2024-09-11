const { request, response } = require("express");
const { detalleVenta_membresias, Venta } = require("../models/Venta");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const { Cliente } = require("../models/Usuarios");
// Calcula la fecha de 10 días en el futuro
const fechaComparacion = dayjs().add(11, "day").format("YYYY-MM-DD"); // Formato 'YYYY-MM-DD' para SQL Server

const EnviarMensajeDeRecordatorioMembresia = async (
  req = request,
  res = response
) => {
  try {
    const clientes10DiasTerminaSuMembresia =
      await detalleVenta_membresias.findAll({
        where: {
          fec_fin_mem: {
            [Op.eq]: fechaComparacion, // Busca clientes cuya fecha fin sea exactamente en 10 días
          },
        },
        include: [
          {
            model: Venta,
            include: [
              {
                model: Cliente,
                attributes: ["email_cli"],
              },
            ],
          },
        ],
      });
    console.log(clientes10DiasTerminaSuMembresia);
    return clientes10DiasTerminaSuMembresia;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  EnviarMensajeDeRecordatorioMembresia,
};
