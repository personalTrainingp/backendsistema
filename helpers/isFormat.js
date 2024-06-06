const eliminarCaracter = (cadena, caracter) => {
  return cadena.split(caracter).join("");
};
module.exports = {
  eliminarCaracter,
};
