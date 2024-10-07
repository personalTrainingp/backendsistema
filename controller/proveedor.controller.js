const { response, request } = require("express");
const { Proveedor, ContratoProv } = require("../models/Proveedor");
const uid = require("uuid");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { typesCRUD } = require("../types/types");
const { Parametros } = require("../models/Parametros");
const { Gastos } = require("../models/GastosFyV");
const PDFDocument = require("pdfkit");
const { convertirNumeroATexto } = require("../helpers/isFormat");
const dayjs = require("dayjs");
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
      estado_prov: false,
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
const descargarContratoProvPDF = async (req = request, res = response) => {
  const { id_contratoprov } = req.params;
  // const contratoProv = await ContratoProv.findOne({
  //   where: { id: id_contratoprov },
  // });
  // const proveedor = await Proveedor.findOne({
  //   where: { id: contratoProv.id_prov },
  // });
  try {
    const doc = new PDFDocument({
      margins: {
        top: 40, // Margen superior de 10 píxeles
        bottom: 20, // Margen inferior de 10 píxeles
        left: 30, // Margen izquierdo de 10 píxeles
        right: 30, // Margen derecho de 10 píxeles
      },
    });
    const dataProv = {
      ruc_empr: "20610496866",
      direccion_empr: "Calle Tarata 226 Miraflores",
      base64_firma_gerente: "",

      razon_social_prov: "CORPORACION HIRE S.A.C.",
      telefono_prov: "942017872",
      cci_prov: "001108140256506586",

      titular_cci_representante: "José Manuel Guevara Milian",
      nombre_representante: "José Manuel Guevara Milian",
      dni_representante: "08007729",
      direc_representante: "Mz A X2 Lote 22 Virgen De Lourdes",
      distrito_representante: "Villa Maria Del Triunfo",
      provincia_representante: "Lima",
      departamento_representante: "Lima",
      telefono_representante: "942017872",
      base64_firma_representante: "",
      //TRABAJO
      direccion_trabajo: "Av. Reducto",
      distrito_trabajo: "Miraflores",
      provincia_trabajo: "Lima",
      departamento_trabajo: "Lima",
      duracion_trabajo: "4",
      moneda: "$",
      penalidad: "5%",
      pago1: "",
      pago2: "",
      pago3: "",
      pago4: "",
      pago5: "",
      Ubicacion_trabajo: "Av. Reducto",
      fec_inicio_trabajo: dayjs(new Date()).format("dd.MM.YYYY"),
      fec_fin_trabajo: new Date(+3),
      trabajo_realizar: "TRABAJO DE GASFITERIA Y MANTENIMIENTO DE 5 BAÑOS",
    };
    // Ahora puedes acceder a dataProv.moneda
    dataProv.formaPago_importe = `${
      dataProv.moneda
    }1000.00 (${convertirNumeroATexto(`1000.00`, dataProv.moneda)})`;

    // Usar una fuente en negrita

    doc.font("Helvetica-Bold");
    doc.fontSize(13);
    doc.text("CONTRATO DE LOCACION DE SERVICIOS", {
      align: "center",
      underline: true,
      lineGap: 10,
    });
    doc.fontSize(11);
    doc.font("Helvetica");
    doc.text(
      `Conste por el presente documento el CONTRATO DE LOCACION DE SERVICIOS, que celebran de una parte INVERSIONES LUROGA S.A.C con RUC No 20601185785, con domicilio en Calle Tarata 226 Distrito de Miraflores, Provincia y Departamento de Lima, debidamente representada por su Gerente General Sr. Luis Alberto Roy Gagliuffi, identificado con DNI No. 09151250, y a quien se le denominará "LA EMPRESA" y de la otra parte el Sr(a). ${dataProv.nombre_representante} identificado con DNI N° ${dataProv.dni_representante} con domicilio en ${dataProv.direc_representante}, Distrito de ${dataProv.distrito_representante}, Provincia ${dataProv.provincia_representante} y Departamento de ${dataProv.departamento_representante} con el teléfono ${dataProv.telefono_representante} a quien en adelante se le denominara “EL PROVEEDOR”, en los términos y condiciones siguientes:`
    );
    //ITEM
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    doc.text(`
1.       OBJETO DEL CONTRATO.
      `);
    doc.font("Helvetica");
    doc.fontSize(11);
    doc.text(
      `LA EMPRESA declara tener interés en contratar los servicios de EL PROVEEDOR para que realice los trabajos de ${dataProv.trabajo_realizar}, en el local ubicado en ${dataProv.direccion_trabajo}, Distrito de ${dataProv.distrito_trabajo}, Provincia ${dataProv.provincia_trabajo} y Departamento de ${dataProv.departamento_trabajo}.  Para tal fin EL PROVEEDOR realizará los servicios detallados en el PRESUPUESTO ENTREGADO. `
    );
    //ITEM
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    doc.text(`
2.       FORMA DE PAGO.
      `);

    doc.font("Helvetica");
    doc.fontSize(11);
    doc.text(
      `a)       EL PROVEEDOR se obliga a realizar los servicios de ${dataProv.trabajo_realizar}, por el importe de ${dataProv.formaPago_importe} no incluye IGV, este monto corresponde a la mano de obra, materiales y movilidad.  Se realizará un RHE por los trabajos realizados.
      
      `
    );
    doc.text(
      `b)       LA EMPRESA acepta la propuesta efectuada por EL PROVEEDOR y se obliga a pagar dicho importe de la siguiente manera:
      
      `
    );
    doc.text(
      `       b.1) LA EMPRESA comprará todos los materiales según los requerimientos realizados por EL PROVEEDOR como consta en los documentos que dicho proveedor anexa a este contrato.`
    );
    doc.text(
      `       b.2) A la firma del contrato se acuerda que LA EMPRESA dará un adelanto por valor del 60% del presupuesto valorizado en S/. 5,686.25. Según el acuerdo con este 60% LA EMPRESA comprará de manera directa la totalidad de los materiales calculados y proporcionados por EL PROVEEDOR. Dicho 60% es de S/3,411.75, el cual se subdivide en 2 partes: materiales S/. 2,188.25 y pago a cuenta de la mano de obra del proveedor por S/. 1,223.50.`
    );
    doc.text(
      `       b.3) El saldo que se le adeuda a EL PROVEEDOR contra entrega de los diferentes mobiliarios es del 40% el monto es de S/ 2,274.50. `
    );
    doc.text(
      `       b.4) Los importes serán realizados en la siguiente Cuenta Bancaria: BCP: 00219410205142404593`
    );
    doc.text(
      `c)     	El proveedor acepta, en el caso de no tener una Cuenta Bancaria en el BANCO BBVA, asumirá el costo de comisión interbancaria que cobran por otros bancos.`
    );


    // doc.text(`-         Adelanto a la firma del contrato: S/. 567.00`);
    // doc.text(`-         Cancelación al termino del servicio: S/. 150.00
    //   `);
    // doc.text(`Los importes serán realizados en la siguiente Cuenta Bancaria :`);
    // doc.text(
    //   `CCI: ${dataProv.cci_prov}     TITULAR : ${dataProv.titular_cci_representante}`
    // );
    //ITEM
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    doc.text(`
3.       FECHA DE INICIO Y PLAZO DE ENTREGA.
      `);
    doc.font("Helvetica");
    doc.fontSize(11);
    doc.text(
      `a)        EL PROVEEDOR se obliga a cumplir estrictamente acordado el CRONOGRAMA con LA EMPRESA.
      `
    );
    doc.text(
      `Queda establecido que EL PROVEEDOR se compromete a entregar el trabajo en un plazo máximo de ${dataProv.duracion_trabajo} días hábiles laborales, b)contados a partir de la fecha en donde la empresa macisa entrega al taller de EL PROVEEDOR los materiales necesarios para que empiece a fabricar los mismos para lo cual una vez recibido los materiales por parte de la empresa macisa EL PROVEEDOR deberá de firmar un acta de entrega de dichos materiales recibidos – conforme.
      En el caso que haya una demora en la entrega de la totalidad de la compra realizada por parte de la empresa macisa al proveedor.
      `
    );

    // doc
    //   .text("     El proveedor se obliga a cumplir con el ", {
    //     continued: true,
    //   })
    //   .font("Helvetica-Bold")
    //   .text("CRONOGRAMA", { continued: true });
    // doc.font("Helvetica").text(" establecido por la EMPRESA.");
    // doc.text(`FECHA INICIO: ${dataProv.fec_inicio_trabajo}`);
    // doc.text(`FECHA DE TERMINO: ${dataProv.fec_fin_trabajo}`);

    //ITEM
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    doc.text(
      `
4.       PENALIDADES.
      `
    );
    doc.font("Helvetica");
    doc.fontSize(11);
    doc.text(
      `a)     En caso de que EL PROVEEDOR no cumpla con las fechas y horas acordadas asumirá un descuento de ${dataProv.penalidad} por cada día de retraso.`
    );
    doc.text(
      `b)     Los horarios de trabajo en el local descrito en la cláusula 1 es de lunes a viernes de 7:30am a 5:00pm y sábado de 8:00am a 1:00pm, cualquier incumplimiento de EL PROVEEDOR en los horarios establecidos serán responsables de cualquier multa que sea emitida por la Municipalidad de Miraflores.`
    );
    doc.text(
      `En fe de lo cual firman en dos ejemplares el presente contrato en Lima, a los 25 días del mes de Abril del 2024`
    );
    doc.text(
      `

      _________________________________                                       ______________________________

              INVERSIONES LUROGA SAC                                                                El PROVEEDOR
                          20601185785                                                                                    ${dataProv.dni_representante}
                Luis Alberto Roy Gagliuffi                                                              ${dataProv.nombre_representante}
                      Gerente General
      `
    );
    // doc.text(
    //   `

    //       EL PROVEEDOR
    //         10084914
    // José Manuel Guevara Milian
    //   `,
    //   {
    //     align: "right",
    //     text: "center",
    //     width: "200",
    //   }
    // );

    doc.pipe(res);
    doc.end();
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
  descargarContratoProvPDF,
};
