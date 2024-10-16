const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");
const { Empleado } = require("./Usuarios");

const HorarioProgramaPT = db.define(
  "tb_HorarioProgramaPT",
  {
    id_horarioPgm: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pgm: {
      type: DataTypes.INTEGER,
    },
    uid: {
      type: DataTypes.STRING,
    },
    time_HorarioPgm: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
    aforo_HorarioPgm: {
      type: DataTypes.INTEGER,
    },
    trainer_HorarioPgm: {
      type: DataTypes.INTEGER,
    },
    estado_HorarioPgm: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_HorarioProgramaPT" }
);
Empleado.hasMany(HorarioProgramaPT, {
  foreignKey: "trainer_HorarioPgm",
  sourceKey: "id_empl",
});
HorarioProgramaPT.belongsTo(Empleado, {
  foreignKey: "trainer_HorarioPgm",
  sourceKey: "id_empl",
});
// Controlador para actualizar la longitud del campo
const actualizarLongitudDelCampo = async () => {
  try {
    // Altera la estructura de la tabla para cambiar la longitud del campo
    await db.query(
      "ALTER TABLE tb_HorarioProgramaPT ALTER COLUMN time_HorarioPgm nvarchar(8);"
    );

    console.log("Se ha actualizado la longitud del campo correctamente.");
  } catch (error) {
    console.error("Error al actualizar la longitud del campo:", error);
  } finally {
    // Cierra la conexión a la base de datos
    await db.close();
  }
};
HorarioProgramaPT.sync()
  .then(() => {
    console.log("La tabla HorarioProgramaPT ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

module.exports = {
  HorarioProgramaPT,
};
