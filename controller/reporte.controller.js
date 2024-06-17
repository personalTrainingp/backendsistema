const { Sequelize, Op } = require("sequelize");
const { ExtensionMembresia } = require("../models/ExtensionMembresia");
const { Cliente } = require("../models/Usuarios");
const { detalleVenta_membresias, Venta } = require("../models/Venta");
const {
  ProgramaTraining,
  SemanasTraining,
} = require("../models/ProgramaTraining");

const getReporteSeguimiento = async (req, res) => {
  const today = new Date();
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);
  try {
    const membresias = await detalleVenta_membresias.findAll({
      attributes: [
        "id",
        "id_venta",
        "tarifa_monto",
        "fec_inicio_mem",
        "fec_fin_mem",
      ],
      order: [["fec_fin_mem", "ASC"]],
      include: [
        {
          model: ExtensionMembresia,
          attributes: [
            "id",
            "id_venta",
            "tipo_extension",
            "extension_inicio",
            "extension_fin",
            "dias_habiles",
          ],
        },
        {
          model: Venta,
          attributes: ["id"],
          include: [
            {
              model: Cliente,
              attributes: [
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("nombre_cli"),
                    " ",
                    Sequelize.col("apPaterno_cli"),
                    " ",
                    Sequelize.col("apMaterno_cli")
                  ),
                  "nombres_apellidos_cli",
                ],
                "email_cli",
              ],
            },
          ],
        },
        {
          model: ProgramaTraining,
          attributes: ["id_pgm", "name_pgm"],
        },
        {
          model: SemanasTraining,
          attributes: ["id_st", "semanas_st"],
        },
      ],
    });
    res.status(200).json(membresias);
  } catch (error) {
    console.log(error);
    res.status(505).json({
      error: error,
    });
  }
};
module.exports = {
  getReporteSeguimiento,
};
