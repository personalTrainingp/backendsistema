const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { ImagePT } = require("./Image");

const plan_Alimenticio_x_cliente = db.define("tb_plan_alimenticio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_dieta: {
    type: DataTypes.STRING(150),
  },
  descripcion_dieta: {
    type: DataTypes.STRING,
  },
  id_cli: {
    type: DataTypes.INTEGER,
  },
  uid_file_dieta: {
    type: DataTypes.STRING,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

plan_Alimenticio_x_cliente
  .sync()
  .then(() => {
    console.log(
      "La tabla plan_Alimenticio_x_cliente ha sido creada o ya existe."
    );
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

plan_Alimenticio_x_cliente.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_file_dieta",
});
ImagePT.belongsTo(plan_Alimenticio_x_cliente, {
  foreignKey: "uid_location",
  sourceKey: "uid_file_dieta",
});
module.exports = {
  plan_Alimenticio_x_cliente,
};
