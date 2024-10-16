const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Parametros } = require("./Parametros");

const FormaPago = db.define("tb_Forma_pago", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid_avatar: {
    type: DataTypes.STRING,
  },
  id_forma_pago: {
    type: DataTypes.INTEGER,
  },
  id_tipo_tarjeta: {
    type: DataTypes.INTEGER,
  },
  id_tarjeta: {
    type: DataTypes.INTEGER,
  },
  id_banco: {
    type: DataTypes.INTEGER,
  },
  estado_venta: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  estado_gasto: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

/*
Gastos.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tipo_comprobante",
  as: "parametro_comprobante",
});
*/
FormaPago.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_forma_pago",
  as: "FormaPagoLabel",
});
FormaPago.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tipo_tarjeta",
  as: "TipoTarjetaLabel",
});
FormaPago.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tarjeta",
  as: "TarjetaLabel",
});
FormaPago.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_banco",
  as: "BancoLabel",
});

FormaPago.sync()
  .then(() => {
    console.log("La tabla FormaPago ha sido sync o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  FormaPago,
};
