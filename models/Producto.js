const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { detalleVenta_producto } = require("./Venta");

const Producto = db.define(
  "tb_producto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    id_marca: {
      type: DataTypes.INTEGER,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
    },
    id_presentacion: {
      type: DataTypes.INTEGER,
    },
    codigo_lote: {
      type: DataTypes.STRING(10),
    },
    codigo_producto: {
      type: DataTypes.STRING(15),
    },
    codigo_contable: {
      type: DataTypes.STRING(15),
    },
    id_prov: {
      type: DataTypes.INTEGER,
    },
    nombre_producto: {
      type: DataTypes.STRING(250),
    },
    prec_venta: {
      type: DataTypes.DECIMAL(10, 2),
    },
    prec_compra: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stock_minimo: {
      type: DataTypes.STRING(3),
    },
    stock_producto: {
      type: DataTypes.STRING(6),
    },
    ubicacion_producto: {
      type: DataTypes.STRING(150),
    },
    fec_vencimiento: {
      type: DataTypes.DATE,
    },
    estado_product: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_producto" }
);
detalleVenta_producto.hasOne(Producto, {
  foreignKey: "id",
  sourceKey: "id_producto",
});
Producto.belongsTo(detalleVenta_producto, {
  foreignKey: "id_producto",
  targetKey: "id",
});

Producto.sync()
  .then(() => {
    console.log("La tabla Producto ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Producto",
      error
    );
  });
module.exports = {
  Producto,
};
