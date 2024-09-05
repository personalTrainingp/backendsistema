const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Cliente, Empleado } = require("./Usuarios");
const { detalleVenta_citas } = require("./Venta");

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
    id_detallecita: {
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
    id_emp: {
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
Cita.hasOne(Empleado, { sourceKey: "id_emp" });
Empleado.belongsTo(Cita, { sourceKey: "id" });
detalleVenta_citas.hasOne(Cita, { foreignKey: "id_detallecita" });
Cita.belongsTo(detalleVenta_citas, {
  foreignKey: "id_detallecita",
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
module.exports = {
  Cita,
};
