const { NumerosALetras } = require("numero-a-letras");

const eliminarCaracter = (cadena, caracter) => {
  return cadena.split(caracter).join("");
};
function convertirNumeroATexto(monto, moneda) {
  // Eliminar el símbolo de moneda y convertir a número
  const valor = parseFloat(monto.trim());

  // Separar la parte entera y la decimal
  const parteEntera = Math.floor(valor);
  const parteDecimal = Math.round((valor - parteEntera) * 100);

  // Convertir a texto la parte entera
  const textoEntero = NumerosALetras(parteEntera).split("Pesos")[0];
  const textoDecimal = parteDecimal.toString().padStart(2, "0"); // Asegura que tenga dos dígitos

  return `${textoEntero} con ${textoDecimal}/100 ${
    moneda == "$" ? "Dolares" : "nuevos soles"
  }`;
}
module.exports = {
  eliminarCaracter,
  convertirNumeroATexto,
};
