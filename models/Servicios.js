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

const SeguimientoClientes = db.define("clientes_seguimiento", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
  },
  id_venta: {
    type: DataTypes.DATEONLY,
  },
  vencimiento: {
    type: DataTypes.STRING(40),
  },
  sesionesPendientes: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})

Servicios.hasOne(detalleVenta_citas, {
  foreignKey: "id_servicio",
});
detalleVenta_citas.belongsTo(Servicios, {
  foreignKey: "id_servicio",
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
