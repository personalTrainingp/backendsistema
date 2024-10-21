const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const Articulos = db.define("tb_articulos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid_image: {
    type: DataTypes.INTEGER,
  },
  producto: {
    type: DataTypes.STRING(40),
  },
  marca: {
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.STRING(2000),
  },
  observacion: {
    type: DataTypes.STRING(2000),
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  valor_unitario_depreciado: {
    type: DataTypes.DECIMAL(10, 2),
  },
  valor_unitario_actual: {
    type: DataTypes.DECIMAL(10, 2),
  },
  lugar_compra_cotizacion: {
    type: DataTypes.DECIMAL(10, 2),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Articulos.sync()
  .then(() => {
    console.log("La tabla Articulos ha sido sync o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  Articulos,
};
