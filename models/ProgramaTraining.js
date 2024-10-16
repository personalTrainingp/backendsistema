const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { ImagePT } = require("./Image");
const { HorarioProgramaPT } = require("./HorarioProgramaPT");

const TarifaTraining = db.define(
  "tb_tarifa_training",
  {
    id_tt: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_st: {
      type: DataTypes.INTEGER,
    },
    nombreTarifa_tt: {
      type: DataTypes.STRING,
    },
    descripcionTarifa_tt: {
      type: DataTypes.STRING(340),
    },
    tarifaCash_tt: {
      type: DataTypes.DECIMAL(18, 2),
    },
    estado_tt: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_tarifa_training" }
);

const SemanasTraining = db.define(
  "tb_semana_training",
  {
    id_st: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pgm: {
      type: DataTypes.INTEGER,
    },
    uid: {
      type: DataTypes.STRING,
    },
    semanas_st: {
      type: DataTypes.INTEGER,
    },
    sesiones: {
      type: DataTypes.INTEGER,
    },
    congelamiento_st: {
      type: DataTypes.INTEGER,
    },
    nutricion_st: {
      type: DataTypes.INTEGER,
    },
    estado_st: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "tb_semana_training",
  }
);
const ProgramaTraining = db.define(
  "tb_ProgramaTraining",
  {
    id_pgm: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    uid_avatar: {
      //uuid_image
      type: DataTypes.STRING,
    },
    name_pgm: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sigla_pgm: {
      type: DataTypes.STRING(10),
    },
    desc_pgm: {
      type: DataTypes.STRING(460),
      allowNull: false,
    },
    estado_pgm: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_ProgramaTraining" }
);

ProgramaTraining.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_avatar",
});
ImagePT.belongsTo(ProgramaTraining, {
  foreignKey: "uid_location",
  sourceKey: "uid_avatar",
});
// //horario
ProgramaTraining.hasMany(HorarioProgramaPT, {
  foreignKey: "id_pgm",
});
HorarioProgramaPT.belongsTo(ProgramaTraining, {
  foreignKey: "id_pgm",
});
// //semana
ProgramaTraining.hasMany(SemanasTraining, {
  foreignKey: "id_pgm",
});
SemanasTraining.belongsTo(ProgramaTraining, {
  foreignKey: "id_pgm",
});
// //Semana=>tarifa
SemanasTraining.hasMany(TarifaTraining, {
  foreignKey: "id_st",
});
TarifaTraining.belongsTo(SemanasTraining, {
  foreignKey: "id_st",
});

// Controlador para actualizar la longitud del campo
const actualizarLongitudDelCampo = async () => {
  try {
    // Altera la estructura de la tabla para cambiar la longitud del campo
    await db.query(
      "ALTER TABLE tb_ProgramaTraining ALTER COLUMN uuidImg_pgm nvarchar(255);"
    );

    console.log("Se ha actualizado la longitud del campo correctamente.");
  } catch (error) {
    console.error("Error al actualizar la longitud del campo:", error);
  } finally {
    // Cierra la conexión a la base de datos
    await db.close();
  }
};
const agregarColumnaTable = async () => {
  try {
    // Altera la estructura de la tabla para cambiar la longitud del campo
    await db.query(
      "ALTER TABLE tb_ProgramaTraining ADD sigla_pgm nvarchar(10);"
    );

    console.log("Se ha actualizado la longitud del campo correctamente.");
  } catch (error) {
    console.error("Error al actualizar la longitud del campo:", error);
  } finally {
    // Cierra la conexión a la base de datos
    await db.close();
  }
};

ProgramaTraining.sync()
  .then(() => {
    console.log("La tabla ProgramaTraining ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
SemanasTraining.sync()
  .then(() => {
    console.log("La tabla SemanasTraining ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
TarifaTraining.sync()
  .then(() => {
    console.log("La tabla TarifaTraining ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
// actualizarLongitudDelCampo();
module.exports = {
  ProgramaTraining,
  TarifaTraining,
  SemanasTraining,
};
