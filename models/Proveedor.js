const { db } = require("../database/sequelizeConnection");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");

const Proveedor = db.define(
  "tb_Proveedor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
    },
    ruc_prov: {
      type: DataTypes.STRING(30),
    },
    id_tarjeta: {
      type: DataTypes.INTEGER,
    },
    n_cuenta: {
      type: DataTypes.STRING(50),
    },
    cci: {
      type: DataTypes.STRING(50),
    },
    razon_social_prov: {
      type: DataTypes.STRING(150),
    },
    tel_prov: {
      type: DataTypes.STRING(250),
    },
    cel_prov: {
      type: DataTypes.STRING(250),
    },
    email_prov: {
      type: DataTypes.STRING(300),
    },
    direc_prov: {
      type: DataTypes.STRING(300),
    },
    dni_vend_prov: {
      type: DataTypes.STRING(20),
    },
    nombre_vend_prov: {
      type: DataTypes.STRING(300),
    },
    cel_vend_prov: {
      type: DataTypes.STRING(20),
    },
    email_vend_prov: {
      type: DataTypes.STRING(20),
    },
    uid_comentario: {
      type: DataTypes.STRING,
    },
    uid_contrato_proveedor: {
      type: DataTypes.STRING,
    },
    uid_presupuesto_proveedor: {
      type: DataTypes.STRING,
    },
    uid_documentos_proveedor: {
      type: DataTypes.STRING,
    },
    estado_prov: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "tb_Proveedor" }
);

const TrabajosProv = db.define("prov_trabajos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cod_trabajo: {
    type: DataTypes.STRING(10),
  },
  id_prov: {
    type: DataTypes.INTEGER,
  },
  fecha_inicio: {
    type: DataTypes.STRING(24),
  },
  fecha_fin: {
    type: DataTypes.STRING(24),
  },
  hora_fin: {
    type: DataTypes.TIME,
  },
  penalidad_porcentaje: {
    type: DataTypes.DECIMAL(10, 2),
  },
  penalidad_fijo: {
    type: DataTypes.DECIMAL(10, 2),
  },
  estado_pro: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const Trabajos_vs_Egresos = db.define("trabajos_vs_egresos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  _prov_trab: {
    type: DataTypes.INTEGER,
  },
  id_egreso: {
    type: DataTypes.INTEGER,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Proveedor.sync()
  .then(() => {
    console.log("La tabla Proveedor ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Proveedor",
      error
    );
  });

const carcel = async () => {
  try {
    // Encuentra todas las filas de la tabla (o puedes hacerlo con un filtro específico)
    const filas = await Proveedor.findAll();

    // Itera sobre cada fila para asignar un UUID distinto
    for (const fila of filas) {
      // Genera un nuevo UUID
      const UUIDcontrato = uuid.v4();
      const UUIDpresupuesto = uuid.v4();
      const uid_documentos_proveedor = uuid.v4();
      // Actualiza la fila con el nuevo UUID
      await fila.update({
        uid_contrato_proveedor: UUIDcontrato,
        uid_presupuesto_proveedor: UUIDpresupuesto,
        uid_documentos_proveedor: uid_documentos_proveedor,
      });
    }

    console.log("UUIDcomentario asignados correctamente.");
  } catch (error) {
    console.error("Error al asignar UUID:", error);
  }
};
// carcel();
module.exports = {
  Proveedor,
};
