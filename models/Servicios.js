const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { detalleVenta_citas } = require("./Venta");

const Servicios = db.define("tb_servicios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo_servicio: {
    type: DataTypes.STRING(5),
  },
  nombre_servicio: {
    type: DataTypes.STRING,
  },
  cantidad_servicio: {
    type: DataTypes.INTEGER,
  },
  tarifa_servicio: {
    type: DataTypes.DECIMAL(10, 2),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  estado_servicio: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Servicios.hasOne(detalleVenta_citas, {
  foreignKey: "id_cita",
});
detalleVenta_citas.belongsTo(Servicios, {
  foreignKey: "id_cita",
});

Servicios.sync()
  .then(() => {
    console.log("La tabla Servicios ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Servicios",
      error
    );
  });

module.exports = {
  Servicios,
};
