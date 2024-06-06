const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Impuesto = db.define("tb_impuesto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_impuesto: {
    type: DataTypes.STRING(100),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const HistorialImpuesto = db.define("tb_historial_impuesto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_impuesto: {
    type: DataTypes.INTEGER,
  },
  multiplicador: {
    type: DataTypes.FLOAT,
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
});

Impuesto.hasMany(HistorialImpuesto, {
  foreignKey: "id_impuesto",
  sourceKey: "id",
});
HistorialImpuesto.belongsTo(Impuesto, {
  foreignKey: "id_impuesto",
  sourceKey: "id",
});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Impuesto.sync()
  .then(() => {
    console.log("La tabla Impuesto ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
HistorialImpuesto.sync()
  .then(() => {
    console.log("La tabla HistorialImpuesto ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  Impuesto,
  HistorialImpuesto,
};
