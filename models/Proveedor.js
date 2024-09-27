const { db } = require("../database/sequelizeConnection");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");
const { Parametros } = require("./Parametros");

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
    id_oficio: {
      type: DataTypes.INTEGER,
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

const ContratoProv = db.define("prov_contratos", {
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
  monto_contrato: {
    type: DataTypes.DECIMAL(10, 2),
  },
  observacion: {
    type: DataTypes.STRING(660),
  },
  estado_contrato: {
    type: DataTypes.INTEGER,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Proveedor.hasOne(Parametros, {
  foreignKey: "id_param",
  sourceKey: "id_oficio",
  as: "parametro_oficio",
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

ContratoProv.sync()
  .then(() => {
    console.log("La tabla ContratoProv ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: ContratoProv",
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
      const UUID = uuid.v4();
      const UUIDComentario = uuid.v4();
      const UUIDcontrato = uuid.v4();
      const UUIDpresupuesto = uuid.v4();
      const uid_documentos_proveedor = uuid.v4();
      // Actualiza la fila con el nuevo UUID
      await fila.update({
        uid: UUID,
        uid_comentario: UUIDComentario,
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
  ContratoProv,
};
