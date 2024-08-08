const dayjs = require("dayjs");
const { default: puppeteer } = require("puppeteer");

const URL = "https://e-consulta.sunat.gob.pe/cl-at-ittipcam/tcS01Alias";

const extraerTipoCambioDeSUNAT_FECHA_ACTUAL = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: "/path/to/your/chrome", // Ajusta esta ruta si es necesario
  });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  await page.waitForSelector("table.calendar-table");
  const data = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll("table.calendar-table tr")
    );
    return rows
      .slice(3)
      .map((row) => {
        // Slice to skip the header rows
        const columns = row.querySelectorAll("td");
        return Array.from(columns, (column) => column.innerText.trim());
      })
      .filter((row) => row.length > 0); // Filter out empty rows
  });
  await browser.close();
  // Procesa los datos para obtener el formato requerido
  const processedData = [];
  data.forEach((row) => {
    row.forEach((cell) => {
      const [day, compra, venta] = cell.split("\n");
      if (compra && venta) {
        processedData.push({
          fecha: `${day}/07/2024`, // Asume que el mes es julio de 2024
          precio_compra: compra.replace(/Compra\s+/g, ""),
          precio_venta: venta.replace(/Venta\s+/g, ""),
          moneda: "USD",
        });
      }
    });
  });

  const resultado = processedData[processedData.length - 1];
  return resultado;
};
module.exports = {
  extraerTipoCambioDeSUNAT_FECHA_ACTUAL,
};
