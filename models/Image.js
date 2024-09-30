const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const ImagePT = db.define(
  "tb_image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid_location: {
      type: DataTypes.STRING,
    },
    uid: {
      type: DataTypes.STRING,
    },
    name_image: {
      type: DataTypes.STRING,
    },
    extension_image: {
      type: DataTypes.STRING(15),
    },
    clasificacion_image: {
      type: DataTypes.STRING(80),
    },
    size_image: {
      type: DataTypes.INTEGER,
    },
    width: {
      type: DataTypes.STRING(8),
    },
    height: {
      type: DataTypes.STRING(8),
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_image" }
);
// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
ImagePT.sync()
  .then(() => {
    console.log("La tabla ImagePT ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  ImagePT,
};
