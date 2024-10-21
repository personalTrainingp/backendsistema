const fs = require("fs");
const fontkit = require("fontkit");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");

const Client_Contrato = async (dataInfo) => {
  // Cargar el archivo de tipografía (ejemplo: Arial.ttf)
  // Cargar el PDF existente
  const existingPdfBytes = fs.readFileSync("contrato_socio2.pdf");
  // Cargar el documento PDF en memoria
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // Obtener la primera página del PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const page13 = pages[12];
  const page10 = pages[9];

  const fontIgBold = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "..",
      "public",
      "fonts",
      "Instagram Sans Bold.ttf"
    )
  );
  if (!fontIgBold || fontIgBold.length === 0) {
    throw new Error(
      "No se pudo cargar la fuente. Verifica que la ruta de la fuente sea correcta."
    );
  }

  // Registrar fontkit en pdf-lib
  pdfDoc.registerFontkit(fontkit);

  // Insertar la tipografía personalizada
  const customFontIgBold = await pdfDoc.embedFont(fontIgBold);
  //IMAGEN DE UN CHECK
  const IMAGEcheck = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "Green_check.png"
  );
  // Leer la imagen como buffer
  const imagecheckBuffer = fs.readFileSync(IMAGEcheck);

  const pngImage = await pdfDoc.embedPng(imagecheckBuffer);
  switch (dataInfo.id_pgm) {
    case "2":
      // Dibujar la imagen en la primera página en una posición y tamaño especificado
      const checkCHANGE45 = firstPage.drawImage(pngImage, {
        x: 180,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case "3":
      const checkFS45 = firstPage.drawImage(pngImage, {
        x: 295,
        y: 320,
        width: 45,
        height: 45,
      });
      break;
    case "4":
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
      y: 70,
      width: 100,
      height: 60,
    });
    page10.drawImage(pngImage, {
      x: 250,
      y: 433,
      width: 120,
      height: 50,
    });
    page13.drawImage(pngImage, {
      x: 250,
      y: 145,
      width: 120,
      height: 50,
    });
  }

  //   //*DATOS CABECERA
  const sede = firstPage.drawText(dataInfo.sede, {
    x: 90,
    y: 660,
    size: 12,
    color: rgb(1, 0, 0),
    font: customFontIgBold,
  });
  const fecha_venta = firstPage.drawText(`${dataInfo.fecha_venta}`, {
    x: 465,
    y: 663,
    size: 10,
    color: rgb(1, 1, 1),
    font: customFontIgBold,
  });
  const hora_venta = firstPage.drawText(`${dataInfo.hora_venta}`, {
    x: 458,
    y: 642,
    size: 10,
    color: rgb(1, 1, 1),
    font: customFontIgBold,
  });
  const nContrato = firstPage.drawText(`#${dataInfo.nContrato}`, {
    x: 65,
    y: 730,
    font: customFontIgBold,
    size: 27,
    color: rgb(0, 0, 0),
  });
  const codigoSocio = firstPage.drawText(`#${dataInfo.codigoSocio}`, {
    x: 438,
    y: 730,
    font: customFontIgBold,
    size: 27,
    color: rgb(0, 0, 0),
  });

  //*DATOS PERSONALES DEL SOCIO
  //Primera fila
  const nombresCliente = firstPage.drawText(dataInfo.nombresCliente, {
    x: 175,
    y: 589,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apPaternoCliente = firstPage.drawText(dataInfo.apPaternoCliente, {
    x: 175,
    y: 564,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const dniCliente = firstPage.drawText(dataInfo.dni, {
    x: 175,
    y: 538,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DireccionCliente = firstPage.drawText(dataInfo.DireccionCliente, {
    x: 175,
    y: 509,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const PaisCliente = firstPage.drawText(dataInfo.PaisCliente, {
    x: 175,
    y: 477,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const CargoCliente = firstPage.drawText(dataInfo.CargoCliente, {
    x: 175,
    y: 447,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const EmailCliente = firstPage.drawText(dataInfo.EmailCliente, {
    x: 175,
    y: 417,
    size: 9,
    color: rgb(0, 0, 0),
  });
  //Segunda columna
  const EdadCliente = firstPage.drawText(`${dataInfo.EdadCliente} AÑOS`, {
    x: 499,
    y: 590,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const apMaternoCliente = firstPage.drawText(dataInfo.apMaternoCliente, {
    x: 388,
    y: 564,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const DistritoCliente = firstPage.drawText(dataInfo.DistritoCliente, {
    x: 388,
    y: 538,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FechaDeNacimientoCliente = firstPage.drawText(
    dataInfo.FechaDeNacimientoCliente,
    {
      x: 385,
      y: 590,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const CentroDeTrabajoCliente = firstPage.drawText(
    dataInfo.CentroDeTrabajoCliente,
    {
      x: 388,
      y: 479,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  const origenCliente = firstPage.drawText(dataInfo.origenCliente, {
    x: 388,
    y: 447,
    size: 9,
    color: rgb(0, 0, 0),
  });

  //*DATOS DEL PROGRAMA
  //Columna 1
  const Programa = firstPage.drawText(dataInfo.Programa, {
    x: 175,
    y: 279,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FecInicio = firstPage.drawText(dataInfo.fec_inicio, {
    x: 175,
    y: 251,
    size: 9,
    color: rgb(0, 0, 0),
  });
  const FormaPago = firstPage.drawText(
    dataInfo.forma_pago.length > 0
      ? dataInfo.forma_pago.slice(0, -1).join("+ ") +
          " + " +
          dataInfo.forma_pago.slice(-1)
      : "Ninguna",
    {
      x: 172,
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
  const FechaFin = firstPage.drawText(`${dataInfo.fec_fin}`, {
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
  const Monto = firstPage.drawText(`${dataInfo.monto}`, {
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
  page13.drawText(`${dataInfo.fecha_venta}`, {
    x: 445,
    y: 295,
    size: 10,
    font: customFontIgBold,
    color: rgb(1, 1, 1),
  });
  page13.drawText(`${dataInfo.hora_venta}`, {
    x: 437,
    y: 272,
    size: 10,
    font: customFontIgBold,
    color: rgb(1, 1, 1),
  });
  page13.drawText(
    `${dataInfo.nombresCliente} ${dataInfo.apPaternoCliente} ${dataInfo.apMaternoCliente}`,
    {
      x: 205,
      y: 243,
      size: 9,
      color: rgb(0, 0, 0),
    }
  );
  page13.drawText(`${dataInfo.dni}`, {
    x: 205,
    y: 216,
    size: 9,
    color: rgb(0, 0, 0),
  });

  // Serializar el documento PDF a bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

module.exports = {
  Client_Contrato,
};
