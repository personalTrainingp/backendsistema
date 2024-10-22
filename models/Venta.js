const { DataTypes } = require("sequelize");
const uuid = require("uuid");
const { db } = require("../database/sequelizeConnection");
const { Cliente, Empleado } = require("./Usuarios");
const { ProgramaTraining, SemanasTraining } = require("./ProgramaTraining");
const { Parametros } = require("./Parametros");
const { ImagePT } = require("./Image");

const Venta = db.define("tb_venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cli: {
    type: DataTypes.INTEGER,
  },
  id_empl: {
    type: DataTypes.INTEGER,
  },
  id_tipoFactura: {
    type: DataTypes.INTEGER,
  },
  numero_transac: {
    type: DataTypes.STRING,
  },
  observacion: {
    type: DataTypes.STRING(360),
  },
  id_origen: {
    type: DataTypes.INTEGER,
  },
  id_empresa: {
    type: DataTypes.INTEGER,
  },
  fecha_venta: {
    type: DataTypes.DATE,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_membresias = db.define("detalle_ventaMembresia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  fec_inicio_mem: {
    type: DataTypes.STRING(12),
  },
  fec_fin_mem: {
    type: DataTypes.STRING(12),
  },
  id_pgm: {
    type: DataTypes.INTEGER,
  },
  id_tarifa: {
    type: DataTypes.INTEGER,
  },
  id_st: {
    type: DataTypes.INTEGER,
  },
  uid_firma: {
    type: DataTypes.STRING(255),
  },
  uid_contrato: {
    type: DataTypes.STRING(255),
  },
  horario: {
    type: DataTypes.TIME,
  },
  tarifa_monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_Transferencia = db.define("detalle_ventaTransferencia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  id_membresia: {
    type: DataTypes.INTEGER,
  },
  tarifa_monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
  uid_firma: {
    type: DataTypes.STRING(255),
  },
  uid_contrato: {
    type: DataTypes.STRING(255),
  },
  horario: {
    type: DataTypes.TIME,
  },
  fec_inicio_mem: {
    type: DataTypes.STRING(12),
  },
  fec_fin_mem: {
    type: DataTypes.STRING(12),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_producto = db.define("detalle_ventaProducto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  id_producto: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
  },
  tarifa_monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_citas = db.define("detalle_ventaCitas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  id_servicio: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.STRING,
  },
  tarifa_monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_pagoVenta = db.define("detalleVenta_pagoVenta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  id_forma_pago: {
    type: DataTypes.INTEGER,
  },
  fecha_pago: {
    type: DataTypes.DATE,
  },
  id_banco: {
    type: DataTypes.INTEGER,
  },
  id_tipo_tarjeta: {
    type: DataTypes.INTEGER,
  },
  id_tarjeta: {
    type: DataTypes.INTEGER,
  },
  n_operacion: {
    type: DataTypes.STRING(50),
  },
  observacion: {
    type: DataTypes.STRING(360),
  },
  parcial_monto: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

detalleVenta_pagoVenta.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_forma_pago",
  as: "parametro_forma_pago",
});
detalleVenta_pagoVenta.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_banco",
  as: "parametro_banco",
});
detalleVenta_pagoVenta.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tipo_tarjeta",
  as: "parametro_tipo_tarjeta",
});
detalleVenta_pagoVenta.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tarjeta",
  as: "parametro_tarjeta",
});

detalleVenta_membresias.hasOne(ProgramaTraining, {
  foreignKey: "id_pgm",
  sourceKey: "id_pgm",
});
ProgramaTraining.belongsTo(detalleVenta_membresias, {
  foreignKey: "id_pgm",
  targetKey: "id_pgm",
});

detalleVenta_membresias.hasOne(SemanasTraining, {
  foreignKey: "id_st",
  sourceKey: "id_st",
});
SemanasTraining.belongsTo(detalleVenta_membresias, {
  foreignKey: "id_st",
  targetKey: "id_st",
});

detalleVenta_membresias.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_contrato",
  as: "contrato_x_serv",
});

detalleVenta_membresias.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_firma",
  as: "firma_cli",
});
// Definición de la relación entre Venta y Cliente
Venta.belongsTo(Cliente, {
  foreignKey: "id_cli", // Este debe ser el nombre de la columna en Cliente
  sourceKey: "id",
});
Cliente.hasMany(Venta, {
  foreignKey: "id_cli", // Este debe coincidir con el anterior
  targetKey: "id",
});

// Definición de la relación entre Venta y Empleado
Venta.belongsTo(Empleado, {
  foreignKey: "id_empl", // Este debe ser el nombre de la columna en Empleado
  sourceKey: "id",
});
Empleado.hasMany(Venta, {
  foreignKey: "id_empl", // Este debe coincidir con el anterior
  targetKey: "id",
});

// Definición de la relación entre Venta y detalleVenta_producto
Venta.hasMany(detalleVenta_producto, {
  foreignKey: "id_venta", // Este debe ser el nombre de la columna en detalleVenta_producto
  sourceKey: "id",
});
detalleVenta_producto.belongsTo(Venta, {
  foreignKey: "id_venta", // Este debe coincidir con el anterior
  targetKey: "id",
});

// Definición de la relación entre Venta y detalleVenta_membresias
Venta.hasMany(detalleVenta_membresias, {
  foreignKey: "id_venta", // Este debe ser el nombre de la columna en detalleVenta_membresias
  sourceKey: "id",
});
detalleVenta_membresias.belongsTo(Venta, {
  foreignKey: "id_venta", // Este debe coincidir con el anterior
  targetKey: "id",
});
// Definición de la relación entre Venta y detalleVenta_membresias
Venta.hasMany(detalleVenta_Transferencia, {
  foreignKey: "id_venta", // Este debe ser el nombre de la columna en detalleVenta_membresias
  sourceKey: "id",
  as: 'venta_venta'
});
detalleVenta_Transferencia.belongsTo(Venta, {
  foreignKey: "id_venta", // Este debe coincidir con el anterior
  targetKey: "id",
  as: 'venta_venta'
});
detalleVenta_Transferencia.hasMany(Venta, {
  foreignKey: "id", // Este debe ser el nombre de la columna en detalleVenta_membresias
  sourceKey: "id_membresia",
  as: "venta_transferencia",
});
Venta.belongsTo(detalleVenta_Transferencia, {
  foreignKey: "id", // Este debe coincidir con el anterior
  targetKey: "id_membresia",
  as: "venta_transferencia",
});
// Definición de la relación entre Venta y detalleVenta_citas
Venta.hasMany(detalleVenta_citas, {
  foreignKey: "id_venta", // Este debe ser el nombre de la columna en detalleVenta_citas
  sourceKey: "id",
});
detalleVenta_citas.belongsTo(Venta, {
  foreignKey: "id_venta", // Este debe coincidir con el anterior
  targetKey: "id",
});

// Definición de la relación entre Venta y detalleVenta_pagoVenta
Venta.hasMany(detalleVenta_pagoVenta, {
  foreignKey: "id_venta", // Este debe ser el nombre de la columna en detalleVenta_pagoVenta
  sourceKey: "id",
});
detalleVenta_pagoVenta.belongsTo(Venta, {
  foreignKey: "id_venta", // Este debe coincidir con el anterior
  targetKey: "id",
});
detalleVenta_Transferencia
  .sync()
  .then(() => {
    console.log("La tabla transferencia ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
Venta.sync()
  .then(() => {
    console.log("La tabla Venta ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
detalleVenta_membresias
  .sync()
  .then(() => {
    console.log("La tabla detalleVenta_membresias ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
detalleVenta_pagoVenta
  .sync()
  .then(() => {
    console.log("La tabla detalleVenta_pagoVenta ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
detalleVenta_citas
  .sync()
  .then(() => {
    console.log("La tabla detalleVenta_citas ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
detalleVenta_producto
  .sync()
  .then(() => {
    console.log("La tabla detalleVenta_producto ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

const carcel = async () => {
  try {
    // Encuentra todas las filas de la tabla (o puedes hacerlo con un filtro específico)
    const filas = await detalleVenta_membresias.findAll();

    // Itera sobre cada fila para asignar un UUID distinto
    for (const fila of filas) {
      // Genera un nuevo UUID
      const UUID = uuid.v4();
      const UUID_CONTRATO = uuid.v4();
      // Actualiza la fila con el nuevo UUID
      await fila.update({
        uid_firma: UUID,
        uid_contrato: UUID_CONTRATO,
      });
    }

    console.log("ContratoProv  asignados correctamente.");
  } catch (error) {
    console.error("Error al asignar UUID:", error);
  }
};
// carcel();
module.exports = {
  Venta,
  detalleVenta_membresias,
  detalleVenta_Transferencia,
  detalleVenta_pagoVenta,
  detalleVenta_citas,
  detalleVenta_producto,
};
