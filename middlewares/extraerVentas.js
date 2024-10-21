const { request, response } = require("express");
const transporterU = require("../config/nodemailer");
const { Venta, detalleVenta_membresias } = require("../models/Venta");
const {
  CONTRATO_CLIENT,
  getPDF_CONTRATO,
} = require("../controller/venta.controller");
const {
  ultimaMembresiaxCli,
  detalle_sesionxMembresia,
} = require("./Logicamembresias");
const {
  SemanasTraining,
  TarifaTraining,
} = require("../models/ProgramaTraining");
const uid = require("uuid");
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
    id_empresa,
  } = req.body.detalle_cli_modelo;

  req.detalle_cli = {
    id_cli: id_cli,
    id_empl: id_empl,
    id_tipoFactura: id_tipo_transaccion,
    numero_transac: numero_transac,
    id_origen: id_origen,
    observacion: observacion,
    fecha_venta: new Date(),
    id_empresa,
  };
  next();
};

const extraerFirma = (req, res, next) => {
  const { firmaCli } = req.body.dataVenta;
  req.firmaCli = firmaCli;
  next();
};
const extraerVentaMembresia = async (req, res, next) => {
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
  const membresiaClienteAntiguo = req.body.dataVenta;
  console.log(req.body);

  const membresia = req.body.dataVenta.detalle_venta_transferencia.map(
    (transferencia) => {
      return {
        tarifa_monto: 0, //SOLO POR AHORA
        horario: transferencia.label_horario,
        fec_inicio_mem: transferencia.fec_init_mem,
        fec_fin_mem: transferencia.fec_fin_mem,
        ...transferencia,
        // id_membresia:
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
    if (req.traspasosExtraidos) {
      const {
        id_cli,
        id_empl,
        id_tipoFactura,
        numero_transac,
        observacion,
        id_origen,
        id_enterprice,
      } = req.detalle_cli;
      const {
        tarifa,
        sesiones,
        id_horarioPgm,
        id_pgm,
        fechaInicio_programa,
        fechaFinal,
        time_h,
      } = req.body.dataVenta.detalle_traspaso[0];
      const membresia = await ultimaMembresiaxCli(Number(id_cli));

      if (membresia === null) {
        return res.status(200).json({
          ok: false,
        });
      }
      const detalle_sesion = await detalle_sesionxMembresia(
        membresia["detalle_ventaMembresia.id"]
      );
      const nuevaSesion = new SemanasTraining({
        semanas_st: (sesiones / 5).toFixed(0),
        id_pgm,
        congelamiento_st: detalle_sesion.congelamiento_st,
        nutricion_st: detalle_sesion.nutricion_st,
        estado_st: false,
        uid: uid.v4(),
        sesiones: sesiones,
      });
      await nuevaSesion.save();
      const tarifaNueva = new TarifaTraining({
        id_st: nuevaSesion.id_st,
        nombreTarifa_tt: "TARIFA APERTURA",
        descripcionTarifa_tt: "TARIFA CREADA POR VENTAS",
        tarifaCash_tt: 0,
        estado_tt: false,
      });
      await tarifaNueva.save();
      const venta = new Venta({
        id_cli,
        id_empl,
        id_tipoFactura: id_tipoFactura,
        numero_transac,
        observacion,
        id_origen,
        id_empresa: id_enterprice,
        fecha_venta: new Date(),
      });
      await venta.save();
      const detalle_venta_programa = new detalleVenta_membresias({
        id_venta: venta.id,
        id_st: nuevaSesion.id_st,
        fec_inicio_mem: `${fechaInicio_programa} 00:00:00.000`,
        fec_fin_mem: `${fechaFinal.split("T")[0]}`,
        id_pgm,
        id_tarifa: tarifaNueva.id_tt,
        horario: time_h,
        tarifa_monto: tarifa,
        uid_firma: uid.v4(),
        uid_contrato: uid.v4(),
      });
      await detalle_venta_programa.save();
      next();
    } else {
      const { id_enterprice } = req.params;
      const venta = new Venta({
        ...req.detalle_cli,
        id_empresa: id_enterprice,
      });
      await venta.save();
      req.ventaID = venta.id;
      next();
    }
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
const extraerTraspasos = async (req = request, res = response, next) => {
  if (
    req.body.dataVenta.detalle_traspaso.length <= 0 ||
    !req.body.dataVenta.detalle_traspaso
  )
    return next();

  const traspasosExtraidos = req.body.dataVenta.detalle_traspaso.map((e) => {
    return {
      ...e,
    };
  });
  req.traspasosExtraidos = traspasosExtraidos;
  next();
};
module.exports = {
  extraerTraspasos,
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
