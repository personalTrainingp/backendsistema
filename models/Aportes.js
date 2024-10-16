const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Empleado } = require("./Usuarios");

const Inversionista = db.define("tb_inversionistas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres_completos: {
    type: DataTypes.STRING(260),
  },
  id_tipo_inversionista: {
    type: DataTypes.INTEGER,
  },
  id_tipo_doc: {
    type: DataTypes.INTEGER,
  },
  numDoc: {
    type: DataTypes.STRING(30),
  },
  telefono: {
    type: DataTypes.STRING(25),
  },
  email: {
    type: DataTypes.STRING(350),
  },
});

const Aporte = db.define("tb_aportes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_inversionista: {
    type: DataTypes.INTEGER,
  },
  tipo_aporte: {
    type: DataTypes.INTEGER,
  },
  fecha_aporte: {
    type: DataTypes.STRING(90),
  },
  moneda: {
    type: DataTypes.STRING(3),
  },
  monto_aporte: {
    type: DataTypes.DECIMAL(10, 2),
  },
  id_forma_pago: {
    type: DataTypes.INTEGER,
  },
  id_banco: {
    type: DataTypes.INTEGER,
  },
  n_operacion: {
    type: DataTypes.STRING(35),
  },
  fec_comprobante: {
    type: DataTypes.STRING(20),
  },
  id_tipo_comprobante: {
    type: DataTypes.INTEGER,
  },
  n_comprobante: {
    type: DataTypes.STRING(50),
  },
  observacion: {
    type: DataTypes.STRING(380),
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Aporte.belongsTo(Inversionista, { foreignKey: "id_inversionista" });

/*

Gastos.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_tipo_comprobante",
  as: "parametro_comprobante",
});
Gastos.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_forma_pago",
  as: "parametro_forma_pago",
});
*/

Inversionista.sync()
  .then(() => {
    console.log("La tabla Inversionista ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
Aporte.sync()
  .then(() => {
    console.log("La tabla Aportes ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
module.exports = {
  Aporte,
  Inversionista,
};
