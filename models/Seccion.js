const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const SeccionItem = db.define("tb_seccionItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url_SI: {
    type: DataTypes.INTEGER,
  },
  key_SI: {
    type: DataTypes.STRING,
  },
  isTitle_SI: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  icon_SI: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const ModulosVSseccion = db.define("tb_modulo_vs_seccion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
  },
  id_seccion: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
const rolesvsModulos = db.define("tb_modulo_vs_seccion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

rolesvsModulos
  .sync()
  .then(() => {
    console.log("La tabla rolesvsModulos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Proveedor",
      error
    );
  });

ModulosVSseccion.sync()
  .then(() => {
    console.log("La tabla ModulosVSseccion ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Proveedor",
      error
    );
  });

SeccionItem.sync()
  .then(() => {
    console.log("La tabla SeccionItem ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Proveedor",
      error
    );
  });

module.exports = {
  SeccionItem,
  ModulosVSseccion,
  rolesvsModulos,
};
