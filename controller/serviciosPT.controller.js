const { request, response } = require("express");
const { Servicios } = require("../models/Servicios");

// const postFitology = (req = request, res = response) => {
//   const {
//     nombre_servicio,
//     cantidad_servicio,
//     tarifa_servicio,
//     estado_servicio,
//   } = req.body;
//   try {
//     const fitology = new Servicios({
//       cantidad_servicio,
//       tipo_servicio: "FITOL",
//       nombre_servicio,
//       tarifa_servicio,
//       estado_servicio,
//     });
//     fitology.save();
//   } catch (error) {
//     res.status(500).json({
//       msg: "error en postFitology",
//     });
//   }
// };
// const postNutricion = async (req = request, res = response) => {
//   const {
//     nombre_servicio,
//     cantidad_servicio,
//     tarifa_servicio,
//     estado_servicio,
//   } = req.body;
//   try {
//     const nutricion = new Servicios({
//       cantidad_servicio,
//       tipo_servicio: "NUTRI",
//       nombre_servicio,
//       tarifa_servicio,
//       estado_servicio,
//     });
//     await nutricion.save();
//     res.status(200).json({
//       msg: true,
//       nutricion,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "error en postFitology",
//     });
//   }
// };
// const getTBFitology = async (req = request, res = response) => {
//   try {
//     const fitology = await Producto.findAll({
//       where: { flag: true, tipo_servicio: "FITOL" },
//       attributes: [
//         "nombre_servicio",
//         "cantidad_servicio",
//         "tarifa_servicio",
//         ["estado_servicio", "estado"],
//         "id",
//       ],
//     });
//     res.status(200).json({
//       msg: true,
//       fitology,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el encargado de sistema, getTBFitology",
//     });
//   }
// };
// const getTBNutricion = async (req = request, res = response) => {
//   try {
//     const nutricion = await Servicios.findAll({
//       where: { flag: true, tipo_servicio: "NUTRI" },
//       attributes: [
//         "nombre_servicio",
//         "cantidad_servicio",
//         "tarifa_servicio",
//         ["estado_servicio", "estado"],
//         "id",
//       ],
//     });
//     res.status(200).json({
//       msg: true,
//       nutricion,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el encargado de sistema, getTBNutricion",
//     });
//   }
// };
// const getOneServicio = async (req = request, res = response) => {
//   const { id } = req.params;
//   try {
//     const servicione = await Servicios.findAll({
//       where: { flag: true, id: id },
//     });
//     res.status(200).json({
//       msg: true,
//       servicione,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el encargado de sistema, getOneServicio",
//     });
//   }
// };
// const deleteOneServicio = async (req = request, res = response) => {
//   const { id } = req.params;
//   try {
//     const servicioOne = await Servicios.findOne({ where: { id: id } });
//     servicioOne.update({ flag: false });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el encargado de sistema, deleteOneServicio",
//     });
//   }
// };
// const updateOneServicio = async (req = request, res = response) => {
//   try {
//     const { id } = req.params;
//     const servicio = await Servicios.findByPk(id);
//     if (!servicio) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No hay ningun servicio con ese id",
//       });
//     }
//     await servicio.update(req.body);
//     res.status(200).json({
//       msg: servicio,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: true,
//       msg: "Error al eliminar el proveedor, updateOneServicio. Hable con el encargado de sistema",
//       error: error.message,
//     });
//   }
// };

const postServicioCita = async (req = request, res = response) => {
  const {
    nombre_servicio,
    cantidad_servicio,
    tarifa_servicio,
    estado_servicio,
  } = req.body;
  const { tipo_serv } = req.params;
  try {
    const serviciosCITA = new Servicios({
      nombre_servicio,
      cantidad_servicio,
      tarifa_servicio,
      estado_servicio,
      tipo_servicio: tipo_serv,
    });
    await serviciosCITA.save();
    res.status(200).json({
      msg: true,
      serviciosCITA,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error en servicios postServicioCita",
    });
  }
};
const getServicioCita = async (req = request, res = response) => {
  const { tipo_serv } = req.params;
  try {
    const serviciosCITA = await Servicios.findAll({
      where: { flag: true, tipo_servicio: tipo_serv },
      attributes: [
        "nombre_servicio",
        "cantidad_servicio",
        "tarifa_servicio",
        ["estado_servicio", "estado"],
        "id",
      ],
    });
    res.status(200).json({
      msg: true,
      serviciosCITA,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema, getServicioCita",
    });
  }
};
const getServicioCitaxID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const servicioCITA = await Servicios.findAll({
      where: { flag: true, id: id },
      attributes: [
        "nombre_servicio",
        "cantidad_servicio",
        "tarifa_servicio",
        ["estado_servicio", "estado"],
        "id",
      ],
    });
    res.status(200).json({
      msg: true,
      servicioCITA,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema, getServicioCita",
    });
  }
};
const putServicioCitaxID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const servicioCITA = await Servicios.findOne({
      where: { flag: true, id: id },
    });
    servicioCITA.update(req.body);
    res.status(200).json({
      msg: true,
      servicioCITA,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema, getServicioCita",
    });
  }
};
const deleteServicioCitaxID = async (req = request, res = response) => {
  const {} = req.body;
  const { id } = req.params;
  try {
    const servicioCITA = await Servicios.findOne({
      where: { flag: true, id: id },
    });
    servicioCITA.update({ flag: false });
    res.status(200).json({
      msg: true,
      servicioCITA,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema, getServicioCita",
    });
  }
};

module.exports = {
  postServicioCita,
  getServicioCita,
  getServicioCitaxID,
  putServicioCitaxID,
  deleteServicioCitaxID,
};
