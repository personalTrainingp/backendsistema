const { Inversionista } = require("../models/Aportes");

const insertaDatosTEST = async () => {
  try {
    await Inversionista.create({
      nombres_completos: "Test",
      id_tipo_inversionista: 0,
      id_tipo_doc: 0,
      numDoc: Math.floor(Math.random() * 100),
      telefono: "1234",
      email: "email@test", // Valor aleatorio
    });
    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};
module.exports = {
  insertaDatosTEST,
};
