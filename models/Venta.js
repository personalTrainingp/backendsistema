const { DataTypes } = require("sequelize");

const { db } = require("../database/sequelizeConnection");
const { Cliente, Empleado } = require("./Usuarios");
const { ProgramaTraining, SemanasTraining } = require("./ProgramaTraining");
const { Parametros } = require("./Parametros");

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
  fecha_venta: {
    type: DataTypes.DATE,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const detalleVenta_transferenciasMembresias = db.define(
  "detalle_ventatransferencias_membresias",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
    },
    tarifa_monto: {
      type: DataTypes.DECIMAL(10, 2),
    },
  }
);
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

module.exports = {
  Venta,
  detalleVenta_membresias,
  detalleVenta_pagoVenta,
  detalleVenta_citas,
  detalleVenta_producto,
};
