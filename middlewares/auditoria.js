const { Auditoria } = require("../models/Auditoria");

const capturarAUDIT = async (formAuditoria) => {
  try {
    const { id_user, ip_user, accion, observacion, fecha_audit } =
      formAuditoria;

    // Verifica los datos recibidos en formAuditoria
    console.log("Formulario de auditoría recibido:", formAuditoria);

    // Crea una nueva instancia de Auditoria con los datos proporcionados
    const auditoria = new Auditoria({
      id_user,
      ip_user,
      accion,
      observacion,
      fecha_audit,
    });

    // Guarda la auditoría en la base de datos
    await auditoria.save();
  } catch (error) {
    // Captura y maneja cualquier error que pueda ocurrir
    console.error("Error al capturar auditoría:", error);
    next(error); // Pasa el error al siguiente middleware de error
  }
};
module.exports = {
  capturarAUDIT,
};
