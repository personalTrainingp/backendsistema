const { request, response } = require("express");
const { Cliente, Usuario, Empleado } = require("../models/Usuarios");
const generarJWT = require("../helpers/jwt");
const uuid = require("uuid");
const { Sequelize } = require("sequelize");
const {
  Venta,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_producto,
  detalleVenta_pagoVenta,
} = require("../models/Venta");
const { ProgramaTraining } = require("../models/ProgramaTraining");
const { extraerIpUser } = require("../helpers/extraerUser");
const { capturarAUDIT } = require("../middlewares/auditoria");
const { typesCRUD } = require("../types/types");

const postUsuarioCliente = (req = request, res = response) => {
  const {
    uid_avatar,
    nombre_cli,
    apPaterno_cli,
    apMaterno_cli,
    fecNac_cli,
    estCivil_cli,
    sexo_cli,
    tipoDoc_cli,
    numDoc_cli,
    nacionalidad_cli,
    ubigeo_distrito_cli,
    direccion_cli,
    tipoCli_cli,
    trabajo_cli,
    cargo_cli,
    tel_cli,
    email_cli,
  } = req.body;
  const { comentarioUnico_UID, contactoEmerg_UID, avatar_UID } = req;
  try {
    const cliente = new Cliente({
      uid_avatar: avatar_UID,
      uid: uuid.v4(),
      nombre_cli,
      apMaterno_cli,
      apPaterno_cli,
      fecNac_cli,
      sexo_cli,
      estCivil_cli,
      tipoDoc_cli,
      numDoc_cli,
      nacionalidad_cli,
      direccion_cli,
      tipoCli_cli,
      trabajo_cli,
      cargo_cli,
      email_cli,
      tel_cli,
      ubigeo_distrito_cli,
      uid_comentario: comentarioUnico_UID,
      uid_contactsEmergencia: contactoEmerg_UID,
    });
    cliente.save();
    res.status(200).json({
      msg: "success",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de programa, hable con el administrador: ${error}`,
    });
  }
};
const getUsuarioClientes = async (req = request, res = response) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: [
        "uid",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("nombre_cli"),
            " ",
            Sequelize.col("apPaterno_cli"),
            " ",
            Sequelize.col("apMaterno_cli")
          ),
          "nombres_apellidos_cli",
        ],
        "tipoCli_cli",
        ["ubigeo_distrito_cli", "ubigeo_distrito"],
        "email_cli",
        "tel_cli",
        ["estado_cli", "estado"],
      ],
      where: { flag: true },
      order: [["id_cli", "desc"]],
    });
    res.status(200).json({
      msg: "success",
      clientes,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getusuarioClientes, hable con el administrador: ${error}`,
    });
  }
};
const getUsuarioCliente = async (req = request, res = response) => {
  try {
    const { uid_cliente } = req.params;
    const cliente = await Cliente.findOne({
      where: { flag: true, uid: uid_cliente },
      include: [
        // {
        //   model: Venta,
        //   include: [
        //     {
        //       model: Empleado,
        //       attributes: ["nombre_emp", "apPaterno_emp", "apMaterno_emp"],
        //     },
        //     {
        //       model: detalleVenta_membresias,
        //       // attributes: [
        //       // ]
        //     },
        //     {
        //       model: detalleVenta_citas,
        //     },
        //     {
        //       model: detalleVenta_producto,
        //     },
        //     {
        //       model: detalleVenta_pagoVenta
        //     }
        //   ],
        // },
      ],
    });
    res.status(200).json({
      msg: "success",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getUsuarioCliente, hable con el administrador: ${error}`,
    });
  }
};
const deleteUsuarioCliente = async (req = request, res = response) => {
  const { uid_cliente } = req.params;
  try {
    const clienteDelete = await Cliente.findOne({
      where: { uid: uid_cliente, flag: true },
    });
    if (!clienteDelete) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un cliente con el id "${uid_cliente}"`,
      });
    }
    clienteDelete.update({ flag: false });
    res.status(200).json({
      msg: "Cliente eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de deleteUsuarioCliente, hable con el administrador: ${error}`,
    });
  }
};
const putUsuarioCliente = async (req = request, res = response) => {
  const { uid_cliente } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { uid: uid_cliente } });
    cliente.update(req.body);
    res.status(200).json({
      msg: "success",
      cliente,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de putUsuarioCliente, hable con el administrador: ${error}`,
    });
  }
};
//Colaborador
const postUsuarioEmpleado = (req = request, res = response) => {
  const {
    nombre_empl,
    apPaterno_empl,
    apMaterno_empl,
    fecNac_empl,
    sexo_empl,
    estCivil_empl,
    tipoDoc_empl,
    numDoc_empl,
    nacionalidad_empl,
    distrito_empl,
    direccion_empl,
    email_empl,
    telefono_empl,
    fecContrato_empl,
    cargo_empl,
    departamento_empl,
    salario_empl,
    tipoContrato_empl,
    horario_empl,
  } = req.body;
  try {
    const { comentarioUnico_UID, contactoEmerg_UID, avatar_UID } = req;
    const empleado = new Empleado({
      uid: uuid.v4(),
      uid_avatar: avatar_UID,
      horario_empl,
      nombre_empl,
      apPaterno_empl,
      apMaterno_empl,
      fecNac_empl,
      sexo_empl,
      estCivil_empl,
      tipoDoc_empl,
      numDoc_empl,
      nacionalidad_empl,
      distrito_empl,
      direccion_empl,
      email_empl,
      telefono_empl,
      fecContrato_empl,
      cargo_empl,
      departamento_empl,
      salario_empl,
      tipoContrato_empl,
      uid_comentario: comentarioUnico_UID,
      uid_contactsEmergencia: contactoEmerg_UID,
    });
    empleado.save();
    res.status(200).json({
      msg: "success",
      empleado,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postUsuarioEmpleado, hable con el administrador: ${error}`,
    });
  }
};
const getUsuarioEmpleados = async (req = request, res = response) => {
  try {
    const empleados = await Empleado.findAll({
      attributes: [
        "uid",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("nombre_empl"),
            " ",
            Sequelize.col("apPaterno_empl"),
            " ",
            Sequelize.col("apMaterno_empl")
          ),
          "nombres_apellidos_empl",
        ],
        ["ubigeo_distrito_empl", "ubigeo_distrito"],
        "email_empl",
        "telefono_empl",
        ["estado_empl", "estado"],
      ],
      where: { flag: true },
      order: [["id_empl", "desc"]],
    });
    res.status(200).json({
      msg: "success",
      empleados: empleados,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getusuarioClientes, hable con el administrador: ${error}`,
    });
  }
};
const getUsuarioEmpleado = async (req = request, res = response) => {
  try {
    const { uid_empleado } = req.params;
    const empleado = await Empleado.findOne({
      where: { flag: true, uid: uid_empleado },
    });
    res.status(200).json({
      msg: "success",
      empleado,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getUsuarioCliente, hable con el administrador: ${error}`,
    });
  }
};
const deleteUsuarioEmpleado = (req = request, res = response) => {};
const putUsuarioEmpleado = async (req = request, res = response) => {
  const { uid_empleado } = req.params;
  try {
    const empleado = await Empleado.findOne({ where: { uid: uid_empleado } });
    empleado.update(req.body);
    res.status(200).json({
      msg: "success",
      empleado,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de putUsuarioCliente, hable con el administrador: ${error}`,
    });
  }
};
//Usuario
const postUsuario = async (req = request, res = response) => {
  const {
    nombres_user,
    apellidos_user,
    usuario_user,
    password_user,
    email_user,
    telefono_user,
    rol_user,
    notiPush_user,
    estado_user,
  } = req.body;
  try {
    let usuario = await Usuario.findOne({
      where: { usuario_user: usuario_user },
    });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: `el usuario que ingresaste esta duplicado, ${usuario_user}`,
      });
    }
    const uid = uuid.v4();
    usuario = new Usuario({
      nombres_user,
      apellidos_user,
      usuario_user,
      password_user,
      email_user,
      telefono_user,
      rol_user,
      notiPush_user,
      estado_user,
      uid: uid,
    });

    await usuario.save();
    res.status(201).json({
      ok: true,
      msg: "Usuario creado con exito",
      usuario: usuario,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de postUsuario, hable con el administrador: ${error}`,
    });
  }
};
const getUsuarios = async (req = request, res = response) => {
  try {
    let usuarios = await Usuario.findAll({
      where: { flag: true },
      attributes: [
        ["estado_user", "estado"],
        ["id_user", "id"],
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("nombres_user"),
            " ",
            Sequelize.col("apellidos_user")
          ),
          "nombres_apellidos_user",
        ],
        "email_user",
        "usuario_user",
        "uid",
      ],
    });
    res.status(200).json({
      ok: true,
      msg: "todo los usuarios",
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getUsuarios, hable con el administrador: ${error}`,
    });
  }
};
const getUsuario = async (req = request, res = response) => {
  try {
    const { uid_user } = req.params;
    const usuario = await Usuario.findOne({
      flag: true,
      where: { uid: uid_user },
    });
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un programa con el id "${uid_user}"`,
      });
    }
    res.status(200).json({
      msg: "usuario present",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getUsuario, hable con el administrador: ${error}`,
    });
  }
};
const deleteUsuario = async (req = request, res = response) => {
  const { id_user } = req.params;
  try {
    const usuario = await Usuario.findByPk(id_user, { flag: true });
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un programa con el id "${id_user}"`,
      });
    }
    pgm.update({ flag: false });
    res.status(200).json({
      msg: "usuario eliminado con exito",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de deleteUsuario, hable con el administrador: ${error}`,
    });
  }
};

const putUsuario = async (req = request, res = response) => {
  const { id_user } = req.params;
  try {
    const usuario = await Usuario.findByPk(id_user, { flag: true });
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un programa con el id "${id_user}"`,
      });
    }
    pgm.update(req.body);
    res.status(200).json({
      msg: "usuario eliminado con exito",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de deleteUsuario, hable con el administrador: ${error}`,
    });
  }
};
const loginUsuario = async (req = request, res = response) => {
  const { usuario_user, password_user } = req.body;

  try {
    let usuario = await Usuario.findOne({
      where: { usuario_user: usuario_user },
    });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
    if (password_user !== usuario.password_user) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }
    let ip_user = extraerIpUser(req, res);
    //Generate JWT token
    const token = await generarJWT(
      usuario.uid,
      usuario.nombres_user,
      usuario.rol_user,
      ip_user,
      usuario.id_user
    );

    let MODULOS_ITEMS = [];
    if (usuario.rol_user === 1) {
      MODULOS_ITEMS = [
        {
          name: "Ventas",
          path: "/venta",
          key: "mod-venta",
        },
      ];
    }
    if (usuario.rol_user === 2) {
      MODULOS_ITEMS = [
        {
          name: "Administracion",
          path: "/adm",
          key: "mod-adm",
        },
        {
          name: "Ventas",
          path: "/venta",
          key: "mod-venta",
        },
      ];
    }
    if (usuario.rol_user === 3) {
      MODULOS_ITEMS = [
        {
          name: "Ventas",
          path: "/venta",
          key: "mod-general-ventas",
        },
      ];
    }

    let formAUDIT = {
      id_user: usuario.id_user,
      ip_user: ip_user,
      accion: typesCRUD.GET,
      observacion: `Usuario Ingresando`,
      fecha_audit: new Date(),
    };
    await capturarAUDIT(formAUDIT);

    res.json({
      ok: true,
      uid: usuario.uid,
      rol_user: usuario.rol_user,
      name: usuario.nombres_user,
      MODULOS_ITEMS,
      token,
    });
  } catch (error) {
    console.log(error, "Aca esta el Error");
    res.status(500).json({
      ok: false,
      msg: "Error a entrar",
    });
  }
};
const revalidarToken = async (req, res) => {
  const { uid, name, rol_user } = req;
  let ip_user = extraerIpUser(req, res);
  const token = await generarJWT(uid, name, rol_user, ip_user);
  let MODULOS_ITEMS = [];

  if (rol_user === 1) {
    MODULOS_ITEMS = [
      {
        name: "Ventas",
        path: "/venta",
        key: "mod-venta",
      },
    ];
  }
  if (rol_user === 2) {
    MODULOS_ITEMS = [
      {
        name: "Administracion",
        path: "/adm",
        key: "mod-adm",
      },
      {
        name: "Ventas",
        path: "/venta",
        key: "mod-venta",
      },
    ];
  }
  if (rol_user === 3) {
    MODULOS_ITEMS = [
      {
        name: "Ventas",
        path: "/venta",
        key: "mod-general-ventas",
      },
    ];
  }
  res.json({
    ok: true,
    msg: "renewed",
    uid,
    name,
    token,
    MODULOS_ITEMS,
  });
};
module.exports = {
  //Cliente
  postUsuarioCliente,
  getUsuarioClientes,
  getUsuarioCliente,
  deleteUsuarioCliente,
  putUsuarioCliente,
  //Empleado
  postUsuarioEmpleado,
  getUsuarioEmpleados,
  getUsuarioEmpleado,
  deleteUsuarioEmpleado,
  putUsuarioEmpleado,
  //Usuario
  postUsuario,
  getUsuarios,
  getUsuario,
  deleteUsuario,
  putUsuario,
  loginUsuario,
  revalidarToken,
};
