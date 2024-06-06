const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Parametros = db.define("tb_parametro", {
  id_param: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  entidad_param: {
    type: DataTypes.STRING(50),
  },
  grupo_param: {
    type: DataTypes.STRING(50),
  },
  sigla_param: {
    type: DataTypes.STRING(30),
  },
  label_param: {
    type: DataTypes.STRING,
  },
  estado_param: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Parametros.sync()
  .then(() => {
    console.log("La tabla Parametros ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  Parametros,
};
