const { response, request } = require("express");
const { Proveedor, ContratoProv } = require("../models/Proveedor");
const uid = require("uuid");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { typesCRUD } = require("../types/types");
const { Parametros } = require("../models/Parametros");
const { Gastos } = require("../models/GastosFyV");

/*
ip_user: '127.0.0.1',
  uid: 'b3b6be6f-5f21-4e49-a12b-40a8c7e24e35',
  name: 'Carlos',
*/
const getProveedorxUID = async (req = request, res = response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(404).json({
        ok: false,
        msg: "No hay uid",
      });
    }
    const proveedor = await Proveedor.findOne({
      where: { flag: true, uid: uid },
      include: [
        {
          model: Parametros,
          as: "parametro_oficio",
        },
      ],
    });
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un proveedor con el uid "${uid}"`,
      });
    }
    res.status(200).json({
      proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getTBProveedores = async (req = request, res = response) => {
  try {
    const { estado_prov } = req.query;
    const proveedores = await Proveedor.findAll({
      order: [["id", "desc"]],
      attributes: [
        "razon_social_prov",
        "ruc_prov",
        "cel_prov",
        "nombre_vend_prov",
        ["estado_prov", "estado"],
        "id",
        "uid",
      ],
      include: [
        {
          model: Parametros,
          as: "parametro_oficio",
        },
      ],
      where: { flag: true, estado_prov: estado_prov },
    });
    res.status(200).json({
      msg: true,
      proveedores,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const PostProveedores = async (req, res, next) => {
  const {
    ruc_prov,
    razon_social_prov,
    tel_prov,
    cel_prov,
    email_prov,
    direc_prov,
    estado_prov,
    dni_vend_prov,
    nombre_vend_prov,
    cel_vend_prov,
    email_vend_prov,
    id_tarjeta,
    n_cuenta,
    id_oficio,
    cci,
  } = req.body;
  try {
    const uid_contrato = uid.v4();
    const uid_comentario = uid.v4();
    const uid_presupuesto_proveedor = uid.v4();
    const uid_documento_proveedor = uid.v4();
    const proveedor = new Proveedor({
      uid: uid.v4(),
      id_oficio: id_oficio,
      uid_contrato_proveedor: uid_contrato,
      uid_comentario: uid_comentario,
      uid_presupuesto_proveedor: uid_presupuesto_proveedor,
      uid_documentos_proveedor: uid_documento_proveedor,
      ruc_prov,
      razon_social_prov,
      tel_prov,
      cel_prov,
      email_prov,
      direc_prov,
      estado_prov,
      dni_vend_prov,
      nombre_vend_prov,
      cel_vend_prov,
      email_vend_prov,
      cci,
      n_cuenta,
      id_tarjeta,
    });
    await proveedor.save();
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.POST,
      observacion: `Se registro: proveedor de id ${proveedor.id}`,
      fecha_audit: new Date(),
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: "Proveedor creado con exito",
      proveedor,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: "No hay id",
      });
    }
    const proveedor = await Proveedor.findOne({
      where: { flag: true, id: id },
    });
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    res.status(200).json({
      proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const deleteProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id, { flag: true });
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un programa con el id "${id}"`,
      });
    }
    proveedor.update({ flag: false });
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.DELETE,
      observacion: `Se elimino: proveedor de id ${proveedor.id}`,
      fecha_audit: new Date(),
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: proveedor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error al eliminar el proveedor. Hable con el encargado de sistema",
      error: error.message,
    });
  }
};
const updateProveedor = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({
        ok: false,
        msg: "No hay ningun proveedor con ese id",
      });
    }

    proveedor.update(req.body);
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.PUT,
      observacion: `Se edito: proveedor de id ${proveedor.id}`,
      fecha_audit: new Date(),
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      proveedor,
      msg: "Proveedor actualizado",
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: `Error al eliminar el proveedor. Hable con el encargado de sistema error: ${error}`,
    });
  }
};
const postContratoProv = async (req = request, res = response) => {
  try {
    // const { } = req.body;
    const contratoProv = new ContratoProv(req.body);
    await contratoProv.save();
    let formAUDIT = {
      id_user: req.id_user,
      ip_user: req.ip_user,
      accion: typesCRUD.POST,
      observacion: `Se registro: contrato del proveedor de id ${contratoProv.id}`,
      fecha_audit: new Date(),
    };
    await capturarAUDIT(formAUDIT);
    res.status(200).json({
      msg: "contrato del Proveedor creado con exito",
      contratoProv,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getContratosxProv = async (req = request, res = response) => {
  const { id_prov } = req.params;
  try {
    const contratosxProv = await ContratoProv.findAll({
      where: { id_prov: id_prov, flag: true },
    });
    res.status(200).json({
      contratosxProv,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getGastosxCodProv = async (req = request, res = response) => {
  const { cod_trabajo, tipo_moneda } = req.params;

  try {
    const gastosxCodTrabajo = await Gastos.findAll({
      where: { cod_trabajo: cod_trabajo, moneda: tipo_moneda, flag: true },
      order: [["fec_pago", "desc"]],
    });
    console.log(gastosxCodTrabajo);

    res.status(200).json({
      gastosxCodTrabajo,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const getContratoxID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const contratosProv = await ContratoProv.findOne({
      where: { id: id, flag: true },
    });
    res.status(200).json({
      contratosProv,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
const deleteContratoxID = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const contratosProv = await ContratoProv.findOne({
      where: { id: id, flag: true },
    });
    contratosProv.update({ flag: false });
    res.status(200).json({
      contratosProv,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el encargado de sistema",
    });
  }
};
module.exports = {
  getTBProveedores,
  PostProveedores,
  getProveedor,
  deleteProveedor,
  updateProveedor,
  getProveedorxUID,
  postContratoProv,
  getContratosxProv,
  getContratoxID,
  deleteContratoxID,
  getGastosxCodProv,
};
