const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { ContratoProv } = require("./Proveedor");

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
const Files = db.define("tb_files", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_file: {
    type: DataTypes.DATE,
  },
  uid_Location: {
    type: DataTypes.STRING,
  },
  id_tipo_file: {
    type: DataTypes.INTEGER,
  },
  uid_file: {
    type: DataTypes.STRING,
  },
  observacion: {
    type: DataTypes.STRING(225),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Files.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_file",
});
ImagePT.belongsTo(Files, {
  foreignKey: "uid_location",
  sourceKey: "uid_file",
});
ContratoProv.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_presupuesto",
});
ImagePT.belongsTo(ContratoProv, {
  foreignKey: "uid_location",
  sourceKey: "uid_presupuesto",
});
Files.sync()
  .then(() => {
    console.log("La tabla files ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
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
  Files,
};
