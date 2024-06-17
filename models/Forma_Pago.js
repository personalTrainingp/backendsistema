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

FormaPago.belongsTo(Parametros, {
  foreignKey: "id_forma_pago",
  as: "FormaPagoLabel",
});
FormaPago.belongsTo(Parametros, {
  foreignKey: "id_tipo_tarjeta",
  as: "TipoTarjetaLabel",
});
FormaPago.belongsTo(Parametros, {
  foreignKey: "id_tarjeta",
  as: "TarjetaLabel",
});
FormaPago.belongsTo(Parametros, { foreignKey: "id_banco", as: "BancoLabel" });

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
