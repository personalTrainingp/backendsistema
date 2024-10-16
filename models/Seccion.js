const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const ModuloItem = db.define("tb_moduloItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.INTEGER,
  },
  path: {
    type: DataTypes.INTEGER,
  },
  key: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const SeccionItem = db.define("tb_seccionItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.INTEGER,
  },
  key: {
    type: DataTypes.INTEGER,
  },
  isTitle: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  parentKey: {
    type: DataTypes.INTEGER,
  },
  icon: {
    type: DataTypes.INTEGER,
  },
  children_1: {
    type: DataTypes.INTEGER,
  },
  children_2: {
    type: DataTypes.INTEGER,
  },
  children_3: {
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

ModuloItem.sync()
  .then(() => {
    console.log("La tabla ModuloItem ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: ModuloItem",
      error
    );
  });

rolesvsModulos
  .sync()
  .then(() => {
    console.log("La tabla rolesvsModulos ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: rolesvsModulos",
      error
    );
  });

ModulosVSseccion.sync()
  .then(() => {
    console.log("La tabla ModulosVSseccion ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: ModulosVSseccion",
      error
    );
  });

SeccionItem.drop()
  .then(() => {
    console.log("La tabla SeccionItem ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: SeccionItem",
      error
    );
  });

module.exports = {
  SeccionItem,
  ModulosVSseccion,
  rolesvsModulos,
};
