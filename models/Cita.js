const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Cliente, Empleado } = require("./Usuarios");
const { detalleVenta_citas, detalleVenta_membresias } = require("./Venta");

const Cita = db.define(
  "tb_cita",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cli: {
      type: DataTypes.INTEGER,
    },
    id_cita_adquirida: {
      type: DataTypes.INTEGER,
    },
    fecha_init: {
      type: DataTypes.DATE,
    },
    fecha_final: {
      type: DataTypes.DATE,
    },
    status_cita: {
      type: DataTypes.STRING,
    },
    id_empl: {
      type: DataTypes.INTEGER,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "tb_cita",
  }
);
const CitasAdquiridas = db.define("tb_citasadquiridas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cli: {
    type: DataTypes.INTEGER,
  },
  id_detalle_mem: {
    type: DataTypes.INTEGER,
  },
  id_detalle_cita: {
    type: DataTypes.INTEGER,
  },
});
Cliente.hasOne(CitasAdquiridas, { foreignKey: "id_cli" });
CitasAdquiridas.belongsTo(Cliente, { foreignKey: "id_cli" });
// CitasAdquiridas -> detalleVenta_citas (id_detalle_cita)
CitasAdquiridas.belongsTo(detalleVenta_membresias, {
  foreignKey: "id_detalle_mem", // La clave foránea en CitasAdquiridas
  targetKey: "id", // Clave primaria en detalleVenta_citas
});

detalleVenta_membresias.hasOne(CitasAdquiridas, {
  foreignKey: "id_detalle_mem", // La clave foránea en CitasAdquiridas
  sourceKey: "id", // Clave primaria en detalleVenta_citas
});
// CitasAdquiridas -> detalleVenta_citas (id_detalle_cita)
CitasAdquiridas.belongsTo(detalleVenta_citas, {
  foreignKey: "id_detalle_cita", // La clave foránea en CitasAdquiridas
  targetKey: "id", // Clave primaria en detalleVenta_citas
});

detalleVenta_citas.hasOne(CitasAdquiridas, {
  foreignKey: "id_detalle_cita", // La clave foránea en CitasAdquiridas
  sourceKey: "id", // Clave primaria en detalleVenta_citas
});

Cita.hasOne(Empleado, { foreignKey: "id_empl" });
Empleado.belongsTo(Cita, { foreignKey: "id_empl" });

CitasAdquiridas.belongsTo(Cita, {
  foreignKey: "id", // La clave foránea en CitasAdquiridas
  targetKey: "id_cita_adquirida", // Clave primaria en detalleVenta_citas
});

Cita.hasOne(CitasAdquiridas, {
  foreignKey: "id", // La clave foránea en CitasAdquiridas
  sourceKey: "id_cita_adquirida", // Clave primaria en detalleVenta_citas
});

Cliente.hasMany(Cita, { foreignKey: "id_cli" });
Cita.belongsTo(Cliente, { foreignKey: "id_cli" });

Cita.sync()
  .then(() => {
    console.log("La tabla Cita ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

CitasAdquiridas.sync()
  .then(() => {
    console.log("La tabla CitasAdquiridas ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  Cita,
  CitasAdquiridas,
};
