const { db } = require("../database/sequelizeConnection");
const { DataTypes } = require("sequelize");
const { Usuario } = require("./Usuarios");

const Comentario = db.define("tb_comentarios", {
  id_comentario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
  },
  uid_location: {
    type: DataTypes.STRING,
  },
  uid_usuario: {
    type: DataTypes.STRING,
  },
  comentario_com: {
    type: DataTypes.STRING(360),
  },
  fec_registro: {
    type: DataTypes.DATE,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Usuario.hasMany(Comentario, {
  foreignKey: "uid_usuario",
  sourceKey: "uid",
});
Comentario.belongsTo(Usuario, {
  foreignKey: "uid_usuario",
  targetKey: "uid",
});
const Actividad = db.define("auth_actividad", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
  },
  uid_user: {
    type: DataTypes.STRING,
  },
  observacion_activity: {
    type: DataTypes.STRING,
  },
});
const ContactoEmergencia = db.define("tb_contactoEmergencia", {
  id_ce: {
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
  nombreContacto_ce: {
    type: DataTypes.STRING,
  },
  tel_ce: {
    type: DataTypes.STRING(25),
  },
  relacion_ce: {
    type: DataTypes.INTEGER,
  },
});

Comentario.sync()
  .then(() => {
    console.log("La tabla Comentario ha sido drop o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

ContactoEmergencia.sync()
  .then(() => {
    console.log("La tabla ContactoEmergencia ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  Comentario,
  ContactoEmergencia,
  Actividad,
};
