const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Meta = db.define("tb_meta", {
  id_meta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_meta: {
    type: DataTypes.STRING(150),
  },
  meta: {
    type: DataTypes.DECIMAL(10, 2),
  },
  bono: {
    type: DataTypes.DECIMAL(10, 2),
  },
  uid: {
    type: DataTypes.STRING,
  },
  fec_init: {
    type: DataTypes.DATE,
  },
  fec_final: {
    type: DataTypes.DATE,
  },
  observacion: {
    type: DataTypes.STRING,
  },
  // status_meta: {
  //   type: DataTypes.STRING(40),
  // },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const MetaVSAsesor = db.define("tb_Meta_vs_Asesores", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  meta_asesor: {
    type: DataTypes.DECIMAL(10, 2),
  },
  id_asesor: {
    type: DataTypes.INTEGER,
  },
  id_meta: {
    type: DataTypes.INTEGER,
  },
  status_meta: {
    type: DataTypes.STRING(40),
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

MetaVSAsesor.sync()
  .then(() => {
    console.log("La tabla MetaVSAsesor ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

Meta.sync()
  .then(() => {
    console.log("La tabla Meta ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  MetaVSAsesor,
  Meta,
};
