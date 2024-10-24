const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Distritos = db.define("tb_distritos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ubigeo: {
    type: DataTypes.STRING(10),
  },
  distrito: {
    type: DataTypes.STRING(45),
  },
  provincia_id: {
    type: DataTypes.INTEGER,
  },
  department_id: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Distritos.sync()
  .then(() => {
    console.log("La tabla Distritos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  Distritos,
};
