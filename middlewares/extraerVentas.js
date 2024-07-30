const { request, response } = require("express");
const transporterU = require("../config/nodemailer");
const { Venta } = require("../models/Venta");
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
    id_cliente,
    id_tipo_transaccion,
    numero_transac,
    id_origen,
    observacion,
  } = req.body.detalle_cli_modelo;

  req.detalle_cli = {
    id_cli: id_cliente,
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
const mailMembresia = async (req, res = response, next) => {
  // const { id } = req.params;
  if (!req.ventaProgramas || req.ventaProgramas.length <= 0) {
    next();
    return;
  }
  /**
   * aforo
: 
20
cong
: 
10
estado_pgm
: 
true
fechaFinal
: 
"2021-04-15"
fechaInicio_programa: "2020-02-20"
firmaCli: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXc
horario: "01:00:00"
id_pgm: 6
label: "01:00:00 | Aforo: 20"
name_pgm: "MUSCLE SOLID"
nombre_tarifa: "TARIFA COMUN"
nutric: 40
semanas: 60
tarifa: 30
tb_image: {name_image: 'muscle solid-1714414949892.png'}
trainer: 2
value: 7
   */
  const {
    nutric,
    semanas,
    name_pgm,
    fechaFinal,
    fechaInicio_programa,
    cong,
    tarifa_monto,
    horario,
  } = req.ventaProgramas[0];
  const {
    id_cli,
    label_cli,
    label_empl,
    label_tipo_transac,
    numero_transac,
    email_cli,
  } = req.detalle_cli;
  if (!email_cli) {
    next();
    return;
  }
  // Crear un objeto de mensaje para enviar por SMTP
  if (email_cli.trim().length <= 0) {
    next();
    return;
  }
  const EMAIL_INFO = {
    regEmail: email_cli,
    nombre_cli: label_cli,
    n_contrato: req.ventaID,
    cod_participante: id_cli,
    membresia: name_pgm,
    semanas: semanas,
    fec_inicio: fechaInicio_programa,
    fec_termino: fechaFinal,
    horario: horario,
    boleta: `${label_tipo_transac} ${numero_transac}`,
    monto: `S/${tarifa_monto}`,
    dias_cong: cong,
    citas_nut: nutric,
    asesor_Fitness: label_empl,
    //informacion detail
    ubicacion_empresa: "Av. Tarata N°226",
    distrito_empresa: "Miraflores",
    wsp1: "994 679 163",
    wsp2: "960 270 237",
  };
  // Leer la imagen del sistema de archivos
  const imageLOGOAttachment = {
    filename: "imageLOGO.jpg",
    path: "./public/logo.png",
    cid: "LOGO@nodemailer.com", // Identificador único para incrustar la imagen
  };
  const imageBANNERAttachment = {
    filename: "imageBANNER.jpg",
    path: "./public/banner.png",
    cid: "BANNER@nodemailer.com", // Identificador único para incrustar la imagen
  };
  const mailOptions = {
    from: "notificaciones@personaltraining.com.pe",
    to: `${EMAIL_INFO.regEmail}`,
    subject: "Asunto del correo",
    attachments: [
      imageLOGOAttachment,
      imageBANNERAttachment,
      {
        filename: `${EMAIL_INFO.nombre_cli}.docx`,
        path: "./middlewares/CORRECCION DE CONTRATO PT.docx", // Ruta absoluta del archivo que quieres adjuntar
      },
    ],
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${EMAIL_INFO.nombre_cli}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
            }
    
    
            th {
                background-color: #f2f2f2;
            }
    
            .logo {
                width: 400px;
                margin: 0 auto;
                display: block;
            }
    
            .text-center {
                text-align: center;
            }
    
            .bold {
                font-weight: bold;
            }
            .bg-primary{
                background-color: #FF5000;
            }
            .bg-black{
                background-color: #000;
            }
            .m-0{
                margin: 0;
            }
            .color-white{
                color: #fff;
            }
            .body-table{
                display: flex;
                justify-content: center;
            }
            .dflex-jcenter{
                display: flex;
                justify-content: center;
            }
            .table-info tr{
                display: flex;
                justify-content: center;
            }
            .table-info td{
                width: 100%;
            }
            .table-info .param{
                text-align: right;
            }
            .table-info tr{
                margin-bottom: 5px;
            }
            .table-info{
                font-size: 18px;
            }
            
        </style>
    </head>
    
    <body>
            <table class="body-table" style="margin-bottom: 50px;">
                <tbody style="width: 650px;  display: flex; flex-direction: column;">
                    <tr>
                        <td colspan="2" class="dflex-jcenter">
                            <img class="logo" src="cid:LOGO@nodemailer.com" style="display: block; height: 200px; margin: 0px auto 20px; width: 250px; cursor: pointer; min-height: auto; min-width: auto;" alt="Logo">
                        </td>
                    </tr>
                    <tr style="display: flex; justify-content: space-between;">
                        <td class="welcome">
                            <div style="margin-bottom: 30px;">
                                <h1 style="font-size: 25px; margin-bottom: 10px;">Bienvenido(a):</h1>
                                <p class="bold m-0" style="font-size: 30px; text-decoration: underline; text-underline-offset: 10px;">${EMAIL_INFO.nombre_cli}</p>
                            </div>
                            <div style="font-style: italic;">
                                <h1 style="margin: 0; font-size: 20px; font-weight: bold;">¡Gracias por unirte a</h1>
                                <p style="margin: 0; font-family: 'Archivo Black', sans-serif; color: #FF5000; font-weight: bold; font-size: 30px;">Personal Training!</p>
                            </div>
                        </td>
                        <td class="digitos">
                        <div style="width: 140px;" class="bg-primary">
                            <p class="bold text-center bg-black color-white bold m-0" style="font-size: 10px; padding: 5px;">CONTRATO N°</p>
                            <p class="text-center m-0 color-white" style="font-size: 30px;">${EMAIL_INFO.n_contrato}</p>
                        </div>
                        <div style="width: 140px; margin-top: 20px;" class="bg-primary">
                            <p class="bold text-center bg-black color-white bold m-0" style="font-size: 10px; padding: 5px;">COD. DEL PARTICIPANTE</p>
                            <p class="text-center m-0 color-white" style="font-size: 30px;">${EMAIL_INFO.cod_participante}</p>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
                <div style="width: 100%;" class="text-center">
                    <span style="background-color: black; color: #fff; padding: 10px 15px; position: relative; top: 10px; font-weight: bold;">
                        R E S U M E N
                    </span>
                </div>
                
                <table class="body-table table-info" style="margin-bottom: 50px;">
                <tbody style="width: 500px;  display: flex; flex-direction: column; justify-content: center; border: 1px solid black; padding: 30px 10px; border-radius: 20px;">
                    <tr>
                        <td class="bold param">Programa: </td>
                        <td>${EMAIL_INFO.membresia}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Semanas: </td>
                        <td>${EMAIL_INFO.semanas}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Fecha de inicio: </td>
                        <td>${EMAIL_INFO.fec_inicio}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Fecha de termino:</td>
                        <td>${EMAIL_INFO.fec_termino}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Horario: </td>
                        <td>${EMAIL_INFO.horario}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Dias de congelamiento: </td>
                        <td>${EMAIL_INFO.dias_cong}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Citas nutricionales:</td>
                        <td>${EMAIL_INFO.citas_nut}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Boleta:</td>
                        <td>${EMAIL_INFO.boleta}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Monto:</td>
                        <td>${EMAIL_INFO.monto}</td>
                    </tr>
                    <tr>
                        <td class="bold param">Asesor Fitness:</td>
                        <td>${EMAIL_INFO.asesor_Fitness}</td>
                    </tr>
                </tbody>
            </table>
            <tr>
            <table class="body-table" style="margin-bottom: 50px;">
            <tbody style="width: 650px;  display: flex; flex-direction: column;">
                        <td colspan="2" class="dflex-jcenter">
                            <img src="BANNER@nodemailer.com" alt="banner"/>
                        </td>
                    </tr>
            </tbody>
            </table>
    </body>
    
    </html>
      `,
  };
  // Enviar correo electrónico por SMTP
  transporterU.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Correo electrónico enviado: " + info.response);
    }

    // Cerrar la conexión SMTP
    transporterU.close();
  });
  next();
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
  extraerVentaMembresia,
  mailMembresia,
  extraerPagos,
  extraerVentaSuplementos,
  extraerCredencialesCliente,
  extraerFirma,
  extraerProductos,
  extraerCitas,
  postNewVenta,
  postVentaFormaPago,
};
