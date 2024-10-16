const nuevos = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: detalleVenta_membresias,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    id_cli: {
      [Op.notIn]: literal(`(
                SELECT id_cli
                FROM tb_venta v2
                JOIN detalle_ventaMembresia dm2 ON v2.id = dm2.id_venta
                WHERE v2.fecha_venta < '${dateRanges[0]}'
            )`),
    },
  },
  group: ["id_cli"],
});
const reinscritos = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: detalleVenta_membresias,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    [Op.and]: literal(`EXISTS (
            SELECT 1
            FROM tb_venta v2
            JOIN tb_detalle_membresia dm2 ON v2.id = dm2.id_venta
            WHERE v2.id_cli = tb_venta.id_cli
            AND dm2.fec_fin_mem < tb_detalle_membresia.fec_inicio_mem
        )`),
  },
  group: ["id_cli"],
});
const renovados = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: DetalleMembresia,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
    {
      model: ExtensionMembresia,
      attributes: [],
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    [Op.and]: literal(`EXISTS (
            SELECT 1
            FROM tb_venta v2
            JOIN detalle_ventaMembresia dm2 ON v2.id = dm2.id_venta
            WHERE v2.id_cli = tb_venta.id_cli
            AND DATEADD(DAY, tb_extension_membresia.dias_habiles, dm2.fec_fin_mem) >= detalle_ventaMembresia.fec_inicio_mem
        )`),
  },
  group: ["id_cli"],
});

/*
  SEGUIMIENTO EN TRATCH

  
    let membresias = await detalleVenta_membresias.findAll({
      attributes: ["id", "fec_inicio_mem", "fec_fin_mem"],
      // limit: 20,
      order: [["id", "DESC"]],
      include: [
        {
          model: ExtensionMembresia,
          attributes: [
            "tipo_extension",
            "extension_inicio",
            "extension_fin",
            "dias_habiles",
          ],
        },
        {
          model: Venta,
          attributes: ["id", "fecha_venta"],
          raw: true,
          include: [
            {
              model: Cliente,
              attributes: [
                "id_cli",
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
          where: { estado_pgm: true, flag: true },
          include: [
            {
              model: ImagePT,
              attributes: ["name_image", "id"],
            },
          ],
        },
        {
          model: SemanasTraining,
          attributes: ["id_st", "semanas_st"],
        },
      ],
    });
    const currentDate = new Date();
    let newMembresias = membresias
      .map((item) => {
        const itemJSON = item.toJSON();
        const tbExtensionMembresia = itemJSON.tb_extension_membresia || [];

        if (tbExtensionMembresia.length === 0) {
          // Si tb_extension_membresia está vacío
          return {
            ...itemJSON,
            dias: 0,
            fec_fin_mem_new: itemJSON.fec_fin_mem, // La nueva fecha es igual a fec_fin_mem
          };
        }
        const totalDiasHabiles = (itemJSON.tb_extension_membresia || []).reduce(
          (total, ext) => total + parseInt(ext.dias_habiles, 10),
          0
        );

        // Calcular la nueva fecha sumando los días hábiles a 'fec_fin_mem'
        const fecFinMem = new Date(itemJSON.fec_fin_mem);
        const fecFinMemNew = addBusinessDays(fecFinMem, totalDiasHabiles);
        return {
          dias: totalDiasHabiles,
          // diasPorTerminar: diasLaborables(new Date(), fecFinMemNew.toISOString()),
          fec_fin_mem_new: fecFinMemNew.toISOString(), // Ajusta el formato según tus necesidades
          ...itemJSON,
        };
      })
      .filter((item) => {
        const fecFinMemNewDate = new Date(item.fec_fin_mem_new);
        if (isClienteActive === "true") {
          return fecFinMemNewDate > currentDate;
        } else if (isClienteActive === "false") {
          return fecFinMemNewDate < currentDate;
        }
        return true; // Sin filtro si isClienteActive no está definido
      })
      .sort((a, b) => {
        const dateA = new Date(a.fec_fin_mem_new);
        const dateB = new Date(b.fec_fin_mem_new);
        if (isClienteActive === "true") {
          return dateA - dateB; // Ordenar de menor a mayor
        } else if (isClienteActive === "false") {
          return dateB - dateA; // Ordenar de mayor a menor
        }
        return 0; // No aplicar orden si isClienteActive no está definido
      });
    // Filtrar para mantener solo el objeto con la fecha_venta más reciente para cada cliente
    const uniqueClientes = new Map();
    newMembresias.forEach((item) => {
      const idCli = item.tb_ventum.tb_cliente.id_cli;
      const currentItem = uniqueClientes.get(idCli);

      if (
        !currentItem ||
        new Date(item.tb_ventum.fecha_venta) >
          new Date(currentItem.tb_ventum.fecha_venta)
      ) {
        uniqueClientes.set(idCli, item);
      }
    });

    newMembresias = Array.from(uniqueClientes.values());
  */

/*
    
const CONTRATO_CLIENT = async (req = request, res = response) => {
  const {
    firmaCli,
    nutric,
    cong,
    time_h,
    id_pgm,
    name_pgm,
    fechaInicio_programa,
    fechaFinal,
  } = req.body.dataVenta;
  const dataInfo = {
    nombresCliente: "Carlos Kenedy",
    apPaternoCliente: "Rosales",
    dni: "60936591",
    DireccionCliente: "direccion avenida",
    PaisCliente: "Peru",
    CargoCliente: "Empleado",
    EmailCliente: "carlosrosales21092002@gmail.com",
    EdadCliente: "22",
    apMaternoCliente: "Morales",
    DistritoCliente: "Barranco",
    FechaDeNacimientoCliente: "21 de setiembre del 2002",
    CentroDeTrabajoCliente: "Empresa",
    origenCliente: "Facebook",
    sede: "Miraflores",
    nContrato: "1234",
    codigoSocio: "123",
    fecha_venta: "21/09/2024",
    hora_venta: "13:00:00 p.m.",
    //datos de membresia
    id_pgm: 4,
    Programa: "MUSCLE",
    fec_inicio: "21/09/2024",
    fec_fin: "21/09/2025",
    horario: "05:00 pm",
    semanas: "4",
    dias_cong: "5",
    sesiones_nutricion: "8",
    asesor: "Alvaro",
    forma_pago: [
      "Tarj. de credito Bbva",
      "yape",
      "plin",
      "transferencia bancaria",
    ],
    monto: "1,150.00",
    //Firma
    firma_cli: firmaCli,
  };
  // Cargar el PDF existente
  const existingPdfBytes = fs.readFileSync("input.pdf");
  // Cargar el documento PDF en memoria
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // Obtener la primera página del PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const page13 = pages[12];
  const page10 = pages[9];

  //IMAGEN DE UN CHECK
  const IMAGEcheck = path.join(__dirname, "..", "public", "Green_check.png");
  // Leer la imagen como buffer
  const imagecheckBuffer = fs.readFileSync(IMAGEcheck);

  const pngImage = await pdfDoc.embedPng(imagecheckBuffer);
  switch (dataInfo.id_pgm) {
    case 2:
      // Dibujar la imagen en la primera página en una posición y tamaño especificado
      const checkCHANGE45 = firstPage.drawImage(pngImage, {
        x: 180,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case 3:
      const checkFS45 = firstPage.drawImage(pngImage, {
        x: 295,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case 4:
      const checkMUSCLE45 = firstPage.drawImage(pngImage, {
        x: 410,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    default:
      break;
  }

  if (dataInfo.firma_cli) {
    // Decodificar la imagen base64 en un buffer
    const base64Data = dataInfo.firma_cli.split(",")[1]; // Obtener solo la parte base64 sin el encabezado
    const imageBuffer = Buffer.from(base64Data, "base64");
    // Incrustar la imagen PNG en el PDF
    const pngImage = await pdfDoc.embedPng(imageBuffer); // O embedJpg si es una imagen JPG
    // Dibujar la imagen en la primera página en una posición y tamaño especificado
    firstPage.drawImage(pngImage, {
      x: 255,
      y: 60,
      width: 100,
      height: 60,
    });
    page10.drawImage(pngImage, {
      x: 250,
      y: 430,
      width: 120,
      height: 50,
    });
    page13.drawImage(pngImage, {
      x: 250,
      y: 166,
      width: 120,
      height: 50,
    });
  }

  //*DATOS CABECERA
  const sede = firstPage.drawText(dataInfo.sede, {
    x: 110,
    y: 650,
    size: 12,
    color: rgb(0, 0, 0),
  });
  const fecha_hora_venta = firstPage.drawText(
    `${dataInfo.fecha_venta} ${dataInfo.hora_venta}`,
    {
      x: 390,
      y: 650,
      size: 12,
      color: rgb(0, 0, 0),
    }
  );
  const nContrato = firstPage.drawText(`#${dataInfo.nContrato}`, {
    x: 67,
    y: 800,
    size: 30,
    color: rgb(0, 0, 0),
  });
  const codigoSocio = firstPage.drawText(`#${dataInfo.codigoSocio}`, {
    x: 440,
    y: 800,
    size: 30,
    color: rgb(0, 0, 0),
  });

  //*DATOS PERSONALES DEL SOCIO
  //Primera fila
  const nombresCliente = firstPage.drawText(dataInfo.nombresCliente, {
    x: 183,
    y: 590,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apPaternoCliente = firstPage.drawText(dataInfo.apPaternoCliente, {
    x: 183,
    y: 565,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const dniCliente = firstPage.drawText(dataInfo.dni, {
    x: 183,
    y: 539,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DireccionCliente = firstPage.drawText(dataInfo.DireccionCliente, {
    x: 183,
    y: 510,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const PaisCliente = firstPage.drawText(dataInfo.PaisCliente, {
    x: 183,
    y: 478,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const CargoCliente = firstPage.drawText(dataInfo.CargoCliente, {
    x: 183,
    y: 448,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const EmailCliente = firstPage.drawText(dataInfo.EmailCliente, {
    x: 183,
    y: 418,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //Segunda columna
  const EdadCliente = firstPage.drawText(dataInfo.EdadCliente, {
    x: 420,
    y: 590,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apMaternoCliente = firstPage.drawText(dataInfo.apMaternoCliente, {
    x: 420,
    y: 565,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DistritoCliente = firstPage.drawText(dataInfo.DistritoCliente, {
    x: 420,
    y: 539,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FechaDeNacimientoCliente = firstPage.drawText(
    dataInfo.FechaDeNacimientoCliente,
    {
      x: 420,
      y: 510,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const CentroDeTrabajoCliente = firstPage.drawText(
    dataInfo.CentroDeTrabajoCliente,
    {
      x: 420,
      y: 478,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const origenCliente = firstPage.drawText(dataInfo.origenCliente, {
    x: 420,
    y: 448,
    size: 9,
    color: rgb(0, 0, 0),
  });

  //*DATOS DEL PROGRAMA
  //Columna 1
  const Programa = firstPage.drawText(dataInfo.Programa, {
    x: 176,
    y: 280,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FecInicio = firstPage.drawText(dataInfo.fec_inicio, {
    x: 176,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FormaPago = firstPage.drawText(
    dataInfo.forma_pago.length > 0
      ? dataInfo.forma_pago.slice(0, -1).join(", ") +
          " y " +
          dataInfo.forma_pago.slice(-1)
      : "Ninguna",
    {
      x: 176,
      y: 225,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const DiasDeCongelamiento = firstPage.drawText(dataInfo.dias_cong, {
    x: 176,
    y: 196,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //Columna 2
  const FechaFin = firstPage.drawText(dataInfo.fec_fin, {
    x: 335,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const SesionesNutricionista = firstPage.drawText(
    dataInfo.sesiones_nutricion,
    {
      x: 335,
      y: 196,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  //Columna 3
  const Sesiones = firstPage.drawText(`${dataInfo.semanas * 6}`, {
    x: 476,
    y: 280,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const horario = firstPage.drawText(`${dataInfo.horario}`, {
    x: 476,
    y: 252,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const asesor = firstPage.drawText(`${dataInfo.asesor}`, {
    x: 476,
    y: 196,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const Monto = firstPage.drawText(dataInfo.monto, {
    x: 476,
    y: 225,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //*DATO DEL pag 09
  page10.drawText(
    `${dataInfo.nombresCliente} ${dataInfo.apPaternoCliente} ${dataInfo.apMaternoCliente}`,
    {
      x: 205,
      y: 527,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  page10.drawText(`${dataInfo.dni}`, {
    x: 205,
    y: 502,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //*DATO DEL pag 13
  page13.drawText(`${dataInfo.fecha_venta} ${dataInfo.hora_venta}`, {
    x: 397,
    y: 306,
    size: 12,
    color: rgb(0, 0, 0),
  });
  page13.drawText(
    `${dataInfo.nombresCliente} ${dataInfo.apPaternoCliente} ${dataInfo.apMaternoCliente}`,
    {
      x: 205,
      y: 261,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  page13.drawText(`${dataInfo.dni}`, {
    x: 205,
    y: 234,
    size: 9,
    color: rgb(0, 0, 0),
  });

  // Serializar el documento PDF a bytes
  const pdfBytes = await pdfDoc.save();
  req.byteContrato = pdfBytes;
  next();
};
    
    */
