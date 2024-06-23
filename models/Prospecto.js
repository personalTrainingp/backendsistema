const { db } = require("../database/sequelizeConnection");
const { DataTypes } = require("sequelize");
const { ProgramaTraining } = require("./ProgramaTraining");
const { Empleado } = require("./Usuarios");

const Prospecto = db.define(
  "tb_Prospectos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    uid_comentario: {
      type: DataTypes.STRING,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    apellido_materno: {
      type: DataTypes.STRING,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
    },
    celular: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
    },
    id_empl: {
      type: DataTypes.INTEGER,
    },
    fecha_registro: {
      type: DataTypes.DATE,
    },
    id_pgm: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_Prospectos" }
);

Prospecto.hasOne(ProgramaTraining, {
  foreignKey: "id_pgm",
  sourceKey: "id_pgm",
});
ProgramaTraining.belongsTo(Prospecto, {
  foreignKey: "id_pgm",
  sourceKey: "id_pgm",
});
Prospecto.hasOne(Empleado, {
  foreignKey: "id_empl",
  sourceKey: "id_empl",
});
Empleado.belongsTo(Prospecto, {
  foreignKey: "id_empl",
  sourceKey: "id_empl",
});

Prospecto.sync()
  .then(() => {
    console.log("La tabla Prospectos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Prospectos",
      error
    );
  });

module.exports = {
  Prospecto,
};
