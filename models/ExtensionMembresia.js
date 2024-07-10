const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { detalleVenta_membresias } = require("./Venta");

const ExtensionMembresia = db.define("tb_extension_membresia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo_extension: {
    type: DataTypes.STRING(5),
  },
  id_venta: {
    type: DataTypes.INTEGER,
  },
  extension_inicio: {
    type: DataTypes.STRING(40),
  },
  extension_fin: {
    type: DataTypes.STRING(40),
  },
  observacion: {
    type: DataTypes.STRING(360),
  },
  uid_img_prueba_extension: {
    type: DataTypes.STRING(360),
  },
  dias_habiles: {
    type: DataTypes.STRING(4),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
detalleVenta_membresias.hasMany(ExtensionMembresia, {
  foreignKey: "id_venta",
  sourceKey: "id_venta",
});
ExtensionMembresia.belongsTo(detalleVenta_membresias, {
  foreignKey: "id_venta",
  sourceKey: "id_venta",
});
ExtensionMembresia.sync()
  .then(() => {
    console.log("La tabla ExtensionMembresia ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  ExtensionMembresia,
};
