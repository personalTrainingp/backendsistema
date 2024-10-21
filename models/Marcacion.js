const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Marcacion = db.define("tb_marcacion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tiempo_marcacion: {
    type: DataTypes.STRING(25),
  },
  nombre_dispostivo: {
    type: DataTypes.STRING(25),
  },
  punto_evento_dispostivo: {
    type: DataTypes.STRING(25),
  },
  dni: {
    type: DataTypes.STRING(20),
  },
  nombre_usuario: {
    type: DataTypes.STRING(20),
  },
  apellido_usuario: {
    type: DataTypes.STRING(20),
  },
  nombre_lector: {
    type: DataTypes.STRING(30),
  },
  verificacion_lector: {
    type: DataTypes.STRING(30),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Marcacion.sync()
  .then(() => {
    console.log("La tabla Marcacion ha sido sync o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  Marcacion,
};
