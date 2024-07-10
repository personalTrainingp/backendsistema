const { db } = require("../database/sequelizeConnection");
const { DataTypes } = require("sequelize");

const Proveedor = db.define(
  "tb_Proveedor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    ruc_prov: {
      type: DataTypes.STRING(30),
    },
    razon_social_prov: {
      type: DataTypes.STRING(150),
    },
    tel_prov: {
      type: DataTypes.STRING(250),
    },
    cel_prov: {
      type: DataTypes.STRING(250),
    },
    email_prov: {
      type: DataTypes.STRING(300),
    },
    direc_prov: {
      type: DataTypes.STRING(300),
    },
    dni_vend_prov: {
      type: DataTypes.STRING(20),
    },
    nombre_vend_prov: {
      type: DataTypes.STRING(300),
    },
    cel_vend_prov: {
      type: DataTypes.STRING(20),
    },
    email_vend_prov: {
      type: DataTypes.STRING(20),
    },
    estado_prov: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_Proveedor" }
);

Proveedor.sync()
  .then(() => {
    console.log("La tabla Proveedor ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Proveedor",
      error
    );
  });

module.exports = {
  Proveedor,
};
