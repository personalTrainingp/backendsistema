const { Marcacion } = require("../models/Marcacion");

const obtenerAsistenciaDeClientes = async (req, res) => {
  const { id_enterprice } = req.params;
  try {
    const asistencia = await Marcacion.findAll({
      where: {
        id_empresa: id_enterprice,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json({ asistencia });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener asistencia de clientes" });
  }
};
module.exports = {
  obtenerAsistenciaDeClientes,
};
