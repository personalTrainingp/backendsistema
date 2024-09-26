const { request, response } = require("express");
const transporterU = require("../config/nodemailer");
const { Venta } = require("../models/Venta");
const {
  CONTRATO_CLIENT,
  getPDF_CONTRATO,
} = require("../controller/venta.controller");
/**
 *  id_venta: '',
  id_empl: 3531,
  id_cliente: 6326,
  id_tipo_transaccion: 0,
  numero_transac: '',
  id_origen: 0,
  observacion: '',
  email_cli: 'carlosrosales21092002@hotmail.com',
  label_cli: 'Carlos Rosales Morales',
  label_empl: 'mmm mmmm mmmm',
  value: 3531,
  label: 'mmm mmmm mmmm'
 */
const extraerCredencialesCliente = (req = request, res = response, next) => {
  // console.log(venta);
  const {
    id_venta,
    id_empl,
    id_cli,
    id_tipo_transaccion,
    numero_transac,
    id_origen,
    observacion,
  } = req.body.detalle_cli_modelo;

  req.detalle_cli = {
    id_cli: id_cli,
    id_empl: id_empl,
    id_tipoFactura: id_tipo_transaccion,
    numero_transac: numero_transac,
    id_origen: id_origen,
    observacion: observacion,
    fecha_venta: new Date(),
  };
  next();
};

const extraerFirma = (req, res, next) => {
  const { firmaCli } = req.body.dataVenta;
  req.firmaCli = firmaCli;
  next();
};
const extraerVentaMembresia = (req, res, next) => {
  if (!req.body.dataVenta.detalle_venta_programa) return next();
  const membresia = req.body.dataVenta.detalle_venta_programa.map((Pgm) => {
    return {
      id_pgm: Pgm.id_pgm,
      id_tarifa: Pgm.id_tt,
      id_st: Pgm.id_st,
      horario: Pgm.time_h,
      tarifa_monto: Pgm.tarifa,
      semanas: Pgm.semanas,
      name_pgm: Pgm.name_pgm,
      fec_fin_mem: Pgm.fechaFinal,
      fec_inicio_mem: Pgm.fechaInicio_programa,
    };
  });
  req.ventaProgramas = membresia;
  next();
};
const extraerVentaTransferenciaMembresia = (req, res, next) => {
  if (!req.body.dataVenta.detalle_venta_transferencia) return next();
  const membresia = req.body.dataVenta.detalle_venta_transferencia.map(
    (Pgm) => {
      return {
        id__transferencia: Pgm.id_pgm,
        horario: Pgm.horario,
        fec_inicio_mem: Pgm.fec_inicio_mem,
        fec_fin_mem: Pgm.fec_fin_mem,
        tarifa_monto: Pgm.id_tt,
      };
    }
  );
  req.ventaTransferencia = membresia;
  next();
};
const extraerVentaSuplementos = (req, res, next) => {
  const arraySuplementos = req.body.dataVenta.detalle_venta_suplementos;
  req.suplementos = arraySuplementos;
  next();
};
const extraerProductos = (req, res, next) => {
  if (
    !(
      req.body.dataVenta.detalle_venta_suplementos ||
      req.body.dataVenta.detalle_venta_accesorio
    )
  ) {
    return next();
  }
  req.productos = [
    ...req.body.dataVenta.detalle_venta_suplementos,
    ...req.body.dataVenta.detalle_venta_accesorio,
  ];
  next();
};
const extraerCitas = (req, res, next) => {
  if (
    !req.body.dataVenta.detalle_venta_nutricion ||
    !req.body.dataVenta.detalle_venta_fitology
  ) {
    return next();
  }
  req.citas = [
    ...req.body.dataVenta.detalle_venta_nutricion,
    ...req.body.dataVenta.detalle_venta_fitology,
  ];
  next();
};
const postNewVenta = async (req, res, next) => {
  try {
    const venta = new Venta(req.detalle_cli);
    await venta.save();
    req.ventaID = venta.id;
    next();
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postNewVenta, hable con el administrador: ${error}`,
    });
  }
};
const postVentaFormaPago = async (req, res, next) => {
  try {
    const venta = new Venta(req.detalle_cli);
    await venta.save();
    req.ventaID = venta.id;
    next();
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postNewVenta, hable con el administrador: ${error}`,
    });
  }
};
const extraerPagos = async (req = request, res = response, next) => {
  if (!req.body.datos_pagos) return next();
  const pagosExtraidos = req.body.datos_pagos.map((e) => {
    return {
      id_forma_pago: e.id_forma_pago,
      fecha_pago: e.fecha_pago,
      id_banco: e.id_banco,
      id_tipo_tarjeta: e.id_tipo_tarjeta,
      id_tarjeta: e.id_tarjeta,
      n_operacion: e.n_operacion,
      observacion: e.observacion_pago,
      parcial_monto: e.monto_pago,
    };
  });
  req.pagosExtraidos = pagosExtraidos;
  next();
};
module.exports = {
  extraerVentaTransferenciaMembresia,
  extraerVentaMembresia,
  extraerPagos,
  extraerVentaSuplementos,
  extraerCredencialesCliente,
  extraerFirma,
  extraerProductos,
  extraerCitas,
  postNewVenta,
  postVentaFormaPago,
};
