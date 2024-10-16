const PDFDocument = require("pdfkit");
const generatePDFcontrato = (dataCallback, endCallback, res) => {
  const doc = new PDFDocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.text("Hello world");
  doc.pipe(res);
  doc.end();
};

module.exports = {
  generatePDFcontrato,
};
