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
const Parametros_Nutricional = db.define("tb_parametros_nutricional", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clave_param_nutricional: {
    type: DataTypes.STRING,
  },
  valor_param_nutricional: {
    type: DataTypes.STRING,
  },
  estado_param_nutricional: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// const ParNutr_vs_consulta = db.define("tb_ParNutr_vs_consulta", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   id_param_nutricional: {
//     type: DataTypes.STRING,
//   },
//   id_consulta_nutri: {
//     type: DataTypes.STRING,
//   }
// });

/*
 */
Parametros_Nutricional.sync()
  .then(() => {
    console.log(
      "La tabla tb_parametros_nutricional ha sido creada o ya existe."
    );
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
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
