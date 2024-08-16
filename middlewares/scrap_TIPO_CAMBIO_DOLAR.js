const { default: axios } = require("axios");
const dayjs = require("dayjs");
const { default: puppeteer } = require("puppeteer");

const cheerio = require("cheerio");
// const url = "https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias";
const url =
  "https://www.sbs.gob.pe/app/pp/sistip_portal/paginas/publicacion/tipocambiopromedio.aspx";
const extraerTipoCambioDeSUNAT_FECHA_ACTUAL = async () => {
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: [
  //     '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"',
  //   ],
  // });
  // const page = await browser.newPage();

  // await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  // await page.waitForSelector("table.calendar-table");
  // const data = await page.evaluate(() => {
  //   const rows = Array.from(
  //     document.querySelectorAll("table.calendar-table tr")
  //   );
  //   return rows
  //     .slice(3)
  //     .map((row) => {
  //       // Slice to skip the header rows
  //       const columns = row.querySelectorAll("td");
  //       return Array.from(columns, (column) => column.innerText.trim());
  //     })
  //     .filter((row) => row.length > 0); // Filter out empty rows
  // });
  // await browser.close();
  // // Procesa los datos para obtener el formato requerido
  // const processedData = [];
  // data.forEach((row) => {
  //   row.forEach((cell) => {
  //     const [day, compra, venta] = cell.split("\n");
  //     if (compra && venta) {
  //       processedData.push({
  //         fecha: `${day}/07/2024`, // Asume que el mes es julio de 2024
  //         precio_compra: compra.replace(/Compra\s+/g, ""),
  //         precio_venta: venta.replace(/Venta\s+/g, ""),
  //         moneda: "USD",
  //       });
  //     }
  //   });
  // });

  try {
    // Realiza la solicitud HTTP
    const { data } = await axios.get(url);
    console.log(data);

    // Carga el HTML en Cheerio
    const $ = cheerio.load(data);

    // Selecciona la fila específica por su id o clase
    const row = $("tr.rgRow"); // Cambia esto si necesitas una selección más específica

    // Obtén todos los <td> en la fila seleccionada
    const tds = row.find("td");

    // Extrae el texto del último <td>
    const lastTdText = tds.last().text().trim();

    // Aquí puedes usar Cheerio para seleccionar y analizar el contenido
    // Por ejemplo, para obtener todos los títulos <h1>:

    // Selecciona la fila específica por su id
    // const row = $("#ctl00_cphContent_rgMercadoProfesional_ctl00__0").text();

    // Obtén todos los <td> en la fila seleccionada
    // const tds = row.find("td");
    console.log(lastTdText);

    // // Extrae el texto del último <td>
    // const lastTdText = tds.last().text().trim();
    // console.log(row, "en cambio");

    // Devuelve el texto del último <td>
    return lastTdText;
  } catch (error) {
    console.error(`Error al obtener los datos: ${error}`);
  }

  // const resultado = processedData[processedData.length - 1];
  // return resultado;
};
module.exports = {
  extraerTipoCambioDeSUNAT_FECHA_ACTUAL,
};
