const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Comision = db.define(
  "tb_comisiones",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_comision: {
      type: DataTypes.STRING,
    },
    comisionar: {
      type: DataTypes.INTEGER,
    },
    tipo_monto: {
      type: DataTypes.STRING(4),
    },
    monto: {
      type: DataTypes.STRING(100),
    },
    fec_inicio: {
      type: DataTypes.DATE,
    },
    fec_fin: {
      type: DataTypes.DATE,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "tb_comisiones",
  }
);

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Comision.sync()
  .then(() => {
    console.log("La tabla Comision ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  Comision,
};
