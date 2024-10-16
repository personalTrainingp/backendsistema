const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Usuario } = require("./Usuarios");

const Auditoria = db.define("tb_auditoria", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  ip_user: {
    type: DataTypes.STRING(40),
  },
  accion: {
    type: DataTypes.INTEGER,
  },
  observacion: {
    type: DataTypes.STRING(2000),
  },
  fecha_audit: {
    type: DataTypes.DATE,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Usuario.hasMany(Auditoria, { foreignKey: "id_user" });
Auditoria.belongsTo(Usuario, { foreignKey: "id_user" });
Auditoria.sync()
  .then(() => {
    console.log("La tabla Auditoria ha sido sync o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  Auditoria,
};
