const { DataTypes, Sequelize } = require("sequelize");

const { db } = require("../database/sequelizeConnection");
const { ImagePT } = require("./Image");
const { Parametros } = require("./Parametros");
const uuid = require("uuid");
const { empleados } = require("../types/type");
//El usuario es todo aca, cuando registra un producto, el es al que se le notifica si el producto esta en stock minimo
//Hay una pagina que se encarga de ver a quien notificar que hacen los usuarios
const Usuario = db.define("auth_user", {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
  },
  nombres_user: {
    type: DataTypes.STRING,
  },
  apellidos_user: {
    type: DataTypes.STRING,
  },
  usuario_user: {
    type: DataTypes.STRING,
  },
  password_user: {
    type: DataTypes.STRING,
  },
  email_user: {
    type: DataTypes.STRING,
  },
  telefono_user: {
    type: DataTypes.STRING,
  },
  rol_user: {
    type: DataTypes.INTEGER,
  },
  notiPush_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  estado_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const Empleado = db.define("tb_empleado", {
  //Datos generales
  id_empl: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
  },
  uid_avatar: {
    type: DataTypes.STRING,
  },
  nombre_empl: {
    type: DataTypes.STRING,
  },
  apPaterno_empl: {
    type: DataTypes.STRING,
  },
  apMaterno_empl: {
    type: DataTypes.STRING,
  },
  fecNac_empl: {
    type: DataTypes.DATEONLY,
  },
  sexo_empl: {
    type: DataTypes.INTEGER,
  },
  estCivil_empl: {
    type: DataTypes.INTEGER,
  },
  tipoDoc_empl: {
    type: DataTypes.INTEGER,
  },
  numDoc_empl: {
    type: DataTypes.STRING(35),
  },
  nacionalidad_empl: {
    type: DataTypes.STRING,
  },
  ubigeo_distrito_empl: {
    type: DataTypes.INTEGER,
  },
  direccion_empl: {
    type: DataTypes.STRING,
  },
  email_empl: {
    type: DataTypes.STRING,
  },
  telefono_empl: {
    type: DataTypes.STRING,
  },
  //Informacion de empleo
  fecContrato_empl: {
    type: DataTypes.DATEONLY,
  },
  horario_empl: {
    type: DataTypes.STRING,
  },
  cargo_empl: {
    type: DataTypes.INTEGER,
  },
  departamento_empl: {
    type: DataTypes.INTEGER,
  },
  salario_empl: {
    type: DataTypes.DECIMAL(18, 2),
  },
  tipoContrato_empl: {
    type: DataTypes.INTEGER,
  },
  uid_comentario: {
    type: DataTypes.STRING,
  },
  uid_contactsEmergencia: {
    type: DataTypes.STRING,
  },
  estado_empl: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  //Informacion bancaria
});

const Cliente = db.define("tb_cliente", {
  id_cli: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid_avatar: {
    type: DataTypes.STRING,
  },
  uid: {
    type: DataTypes.STRING,
  },
  nombre_cli: {
    type: DataTypes.STRING,
  },
  apPaterno_cli: {
    type: DataTypes.STRING,
  },
  apMaterno_cli: {
    type: DataTypes.STRING,
  },
  fecNac_cli: {
    type: DataTypes.DATE,
  },
  sexo_cli: {
    type: DataTypes.INTEGER,
  },
  estCivil_cli: {
    type: DataTypes.INTEGER,
  },
  tipoDoc_cli: {
    type: DataTypes.INTEGER,
  },
  numDoc_cli: {
    type: DataTypes.STRING(35),
  },
  nacionalidad_cli: {
    type: DataTypes.INTEGER,
  },
  ubigeo_distrito_cli: {
    type: DataTypes.INTEGER,
  },
  direccion_cli: {
    type: DataTypes.STRING,
  },
  tipoCli_cli: {
    type: DataTypes.INTEGER,
  },
  trabajo_cli: {
    type: DataTypes.STRING,
  },
  cargo_cli: {
    type: DataTypes.STRING,
  },
  email_cli: {
    type: DataTypes.STRING,
  },
  tel_cli: {
    type: DataTypes.STRING,
  },
  uid_comentario: {
    type: DataTypes.STRING,
  },
  uid_contactsEmergencia: {
    type: DataTypes.STRING,
  },
  estado_cli: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});


const test = () => {};

Cliente.sync()
  .then(() => {
    console.log("La tabla Cliente ha sido drop o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });
Empleado.sync()
  .then(() => {
    console.log("La tabla Empleado ha sido sync o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos: Empleado",
      error
    );
  });
Usuario.sync()
  .then(() => {
    console.log("La tabla Usuario ha sido creada o ya existe.");
  })
  .catch((error) => {
    console.error(
      "Error al sincronizar el modelo con la base de datos:",
      error
    );
  });

const carcel = () => {
  // (async () => {
  //   try {

  //     await Cliente.update(
  //       {
  //         uid: uuid.v4()
  //       },
  //       {
  //         where: {
  //           uid: null,
  //         },
  //       }
  //     );

  //     console.log(
  //       "Todos los valores null en la columna uid han sido actualizados."
  //     );
  //   } catch (error) {
  //     console.error("Unable to connect to the database:", error);
  //   }
  // })();
};
module.exports = {
  Cliente,
  Empleado,
  Usuario,
};
const carcel2 = () => {
  const empleadosConUuid = empleados.map((empleado) => ({
    ...empleado,
    uid: uuid.v4(),
    uid_avatar: uuid.v4(),
    horario_empl: "",
    cargo_empl: 0,
    departamento_empl: 0,
    salario_empl: 0.0,
    uid_contactsEmergencia: uuid.v4(),
    uid_comentario: uuid.v4(),
    tipoContrato_empl: 0,
  }));
  Empleado.bulkCreate(empleadosConUuid)
    .then(() => {
      console.log("empleados successfully");
    })
    .catch((error) => {
      console.error("Error inserting posts:");
    });
};
