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

const HistorialClinico = db.define("cliente_historial_clinico", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cli: {
    type: DataTypes.INTEGER,
  },
  uid_file: {
    type: DataTypes.STRING,
  },
  antec_pat_de_algun_familiar: {
    type: DataTypes.STRING,
  },
  dato_motivacion: {
    type: DataTypes.STRING,
  },
  antec_pat_fumado: {
    type: DataTypes.STRING,
  },
  antec_pat_consumes_farmaco: {
    type: DataTypes.STRING,
  },
  antec_pat_tomas_alcohol: {
    type: DataTypes.STRING,
  },
  antec_pat_realizas_actividad_fisica: {
    type: DataTypes.STRING,
  },
  antec_pat_modific_tu_alimentacion_ultimos6meses: {
    type: DataTypes.STRING,
  },
  antec_pat_cual_es_tu_apetito: {
    type: DataTypes.STRING,
  },
  antec_pat_hora_de_mas_hambre: {
    type: DataTypes.STRING,
  },
  antec_pat_alimentos_preferidos: {
    type: DataTypes.STRING,
  },
  antec_pat_alimentos_desagradables: {
    type: DataTypes.STRING,
  },
  antec_pat_alimentos_alergias: {
    type: DataTypes.STRING,
  },
  antec_pat_alimentos_suplemento_complemento: {
    type: DataTypes.STRING,
  },
  antec_pat_alimentos_segun_estado_animo: {
    type: DataTypes.STRING,
  },
  antec_pat_tratam_perdida_peso: {
    type: DataTypes.STRING,
  },
  hora_acostarse: {
    type: DataTypes.STRING,
  },
  horaDeDespierto: {
    type: DataTypes.STRING,
  },
  horario_desayuno: {
    type: DataTypes.STRING,
  },
  horaDeDormir: {
    type: DataTypes.STRING,
  },
  lugar_desayuno: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_desayuno: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_desayuno: {
    type: DataTypes.STRING,
  },
  horario_media_maniana: {
    type: DataTypes.STRING,
  },
  lugar_media_maniana: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_media_maniana: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_media_maniana: {
    type: DataTypes.STRING,
  },
  horario_almuerzo: {
    type: DataTypes.STRING,
  },
  lugar_almuerzo: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_almuerzo: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_almuerzo: {
    type: DataTypes.STRING,
  },
  horario_media_tarde: {
    type: DataTypes.STRING,
  },
  lugar_media_tarde: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_media_tarde: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_media_tarde: {
    type: DataTypes.STRING,
  },
  horario_cena: {
    type: DataTypes.STRING,
  },
  lugar_cena: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_cena: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_cena: {
    type: DataTypes.STRING,
  },
  horario_extras: {
    type: DataTypes.STRING,
  },
  lugar_extras: {
    type: DataTypes.STRING,
  },
  alimentacion_actual_extras: {
    type: DataTypes.STRING,
  },
  alimentacion_plan_extras: {
    type: DataTypes.STRING,
  },
  vasos_agua_x_dia: {
    type: DataTypes.STRING,
  },
  consumo_gaseosa: {
    type: DataTypes.STRING,
  },
  consumo_dulces: {
    type: DataTypes.STRING,
  },
  cambios_fin_semana: {
    type: DataTypes.STRING,
  },
  hora_dormir: {
    type: DataTypes.STRING,
  },
  hora_despertar: {
    type: DataTypes.STRING,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const HistorialClinico_Antec_patol = db.define(
  "historialclinico_antecedentes_patologicos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_historial_clinico: {
      type: DataTypes.INTEGER,
    },
    id_pat: {
      type: DataTypes.STRING(5),
    },
  }
);

HistorialClinico.sync()
  .then(() => {
    console.log("La tabla HistorialClinico ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
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

HistorialClinico.hasOne(ImagePT, {
  foreignKey: "uid_location",
  sourceKey: "uid_file",
});
ImagePT.belongsTo(HistorialClinico, {
  foreignKey: "uid_location",
  sourceKey: "uid_file",
});
module.exports = {
  plan_Alimenticio_x_cliente,
  HistorialClinico,
};
