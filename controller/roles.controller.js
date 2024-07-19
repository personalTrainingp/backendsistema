const { response, request } = require("express");
const {
  SeccionItem,
  ModulosVSseccion,
  rolesvsModulos,
} = require("../models/Seccion");
const { Usuario } = require("../models/Usuarios");

const seccionPOST = async (req = response, res = response) => {
  try {
    const seccion = new SeccionItem(req.body);
    res.status(200).json({
      msg: "success",
      seccion,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de seccionPOST, hable con el administrador: ${error}`,
    });
  }
};
const moduloPOST = async (req = response, res = response) => {
  try {
    const modulosStory = new ModulosVSseccion(req.body);
    res.status(200).json({
      msg: "success",
      modulosStory,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de moduloPOST, hable con el administrador: ${error}`,
    });
  }
};
const rolPOST = async (req = response, res = response) => {
  try {
    const rolStory = new rolesvsModulos(req.body);
    res.status(200).json({
      msg: "success",
      rolStory,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de moduloPOST, hable con el administrador: ${error}`,
    });
  }
};
const seccionGET = async (req = request, res = response) => {
  const { modulo } = req.params;
  try {
    let MENU_ITEMS = [];
    if (modulo === "mod-venta") {
      MENU_ITEMS = [
        {
          key: "ventas",
          label: "Ventas",
          isTitle: true,
        },
        {
          key: "ventas-nuevaVenta",
          label: "Nueva venta",
          isTitle: false,
          icon: "uil-calender",
          url: "/nueva-venta",
        },
        {
          key: "ventas-seguimiento",
          label: "Seguimiento",
          isTitle: false,
          icon: "uil-calender",
          url: "/seguimiento",
        },
        {
          key: "cliente",
          label: "Cliente",
          isTitle: true,
        },
        {
          key: "cliente-admClientes",
          label: "Administrador de clientes",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-clientes",
        },
        {
          key: "cliente-prospecto",
          label: "Prospectos",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-prospecto",
        },
        {
          key: "cita",
          label: "Citas",
          isTitle: true,
        },
        {
          key: "citas-nutricional",
          label: "Citas nutricionales",
          isTitle: false,
          icon: "uil-calender",
          url: "/crear-citas-nutricion",
        },
        {
          key: "citas-fitology",
          label: "Citas Fitology",
          isTitle: false,
          icon: "uil-calender",
          url: "/crear-citas-fitology",
        },
        {
          key: "cong-reg",
          label: "Congelamiento y Regalo",
          isTitle: true,
        },
        {
          key: "congreg",
          label: "Congelamiento y regalos",
          isTitle: false,
          icon: "uil-calender",
          url: "/extension-membresia",
        },
      ];
    }
    if (modulo === "mod-adm") {
      MENU_ITEMS = [
        {
          key: "config",
          label: "Configuracion",
          isTitle: true,
        },
        {
          key: "adm-usuario",
          label: "Administrar usuarios",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-auth-usuario",
        },
        {
          key: "adm-audit",
          label: "Auditoria",
          isTitle: false,
          icon: "uil-calender",
          url: "/auditoria",
        },
        {
          key: "prov",
          label: "Proveedores",
          isTitle: true,
        },
        {
          key: "gest-prov",
          label: "Gestion de proveedores",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-proveedores",
        },
        {
          key: "planilla",
          label: "Planilla",
          isTitle: true,
        },
        {
          key: "colaboradores-admColaboradores",
          label: "Colaboradores",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-empleados",
        },
        {
          key: "gest-serv",
          label: "Gestion de servicios",
          isTitle: true,
        },
        {
          key: "gestion-pgms",
          label: "Gestion de programas",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-programas",
        },
        {
          key: "gestion-prds",
          label: "Productos",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-productos",
        },
        {
          key: "serv-fito",
          label: "Fitology",
          isTitle: false,
          icon: "uil-calender",
          url: "/serv-fitology",
        },
        {
          key: "serv-nutri",
          label: "Nutricion",
          isTitle: false,
          icon: "uil-calender",
          url: "/serv-nutricion",
        },
        {
          key: "gf-gv",
          label: "Egresos y Aportes",
          isTitle: true,
        },
        {
          key: "gestion-gfgv",
          label: "Egresos",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-gastosF-gastosV",
        },
        {
          key: "gestion-gfgv",
          label: "Aportes",
          isTitle: false,
          icon: "uil-calender",
          url: "/aporte-ingresos",
        },
        {
          key: "planilla",
          label: "Otros",
          isTitle: true,
        },
        {
          key: "adm-gestionDct",
          label: "Impuestos",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-descuentos",
        },
        {
          key: "adm-gestionComisional",
          label: "Comisiones",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-comisional",
        },
        // {
        //   key: "menu-levels",
        //   label: "Multi Levels",
        //   isTitle: false,
        //   icon: "uil-folder-plus",
        //   children: [
        //     {
        //       key: "menu-levels-1-1",
        //       label: "Level 1.1",
        //       url: "/",
        //       parentKey: "menu-levels",
        //     },
        //     {
        //       key: "menu-levels-1-2",
        //       label: "Level 1.2",
        //       url: "/",
        //       parentKey: "menu-levels",
        //     },
        //   ],
        // },
      ];
    }
    if (modulo === "mod-general-ventas") {
      MENU_ITEMS = [
        {
          key: "ventas",
          label: "Ventas",
          isTitle: true,
        },
        {
          key: "ventas-nuevaVenta",
          label: "Nueva venta",
          isTitle: false,
          icon: "uil-calender",
          url: "/nueva-venta",
        },
        {
          key: "gestion-ventas",
          label: "Ventas",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-ventas",
        },
        {
          key: "ventas-seguimiento",
          label: "Seguimiento",
          isTitle: false,
          icon: "uil-calender",
          url: "/seguimiento",
        },
        {
          key: "reportes",
          label: "Reportes",
          url: "/reporte",
          isTitle: false,
          icon: "uil-home-alt",
          children: [
            {
              key: "r-totalVentas",
              label: "Total de ventas",
              url: "/reporte/total-ventas",
              icon: "uil-home-alt",
              parentKey: "reportes",
            },
            {
              key: "r-ventasPrograma",
              label: "Ventas por programas",
              url: "/reporte/reporte-programa",
              parentKey: "reportes",
            },
            {
              key: "r-ventasAsesor",
              label: "Ventas por asesor",
              url: "/reporte/ventas-asesor",
              parentKey: "reportes",
            },
            {
              key: "r-ventasDia",
              label: "Ventas por metas",
              url: "/reporte/ventas-metas",
              parentKey: "reportes",
            },
          ],
        },
        {
          key: "cliente",
          label: "Cliente",
          isTitle: true,
        },
        {
          key: "cliente-admClientes",
          label: "Administrador de clientes",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-clientes",
        },
        {
          key: "cliente-prospecto",
          label: "Prospectos",
          isTitle: false,
          icon: "uil-calender",
          url: "/gestion-prospecto",
        },
        {
          key: "cita",
          label: "Citas",
          isTitle: true,
        },
        {
          key: "citas-NUT",
          label: "Citas nutricionales",
          isTitle: false,
          icon: "uil-calender",
          url: "/crear-citas-nutricion",
        },
        {
          key: "citas-FIT",
          label: "Citas Fitology",
          isTitle: false,
          icon: "uil-calender",
          url: "/crear-citas-fitology",
        },
        {
          key: "cong-reg",
          label: "Congelamiento y Regalo",
          isTitle: true,
        },
        {
          key: "congreg",
          label: "Congelamiento y regalos",
          isTitle: false,
          icon: "uil-calender",
          url: "/extension-membresia",
        },
        {
          key: "Metas",
          label: "Metas y bonos",
          isTitle: true,
        },
        {
          key: "meta",
          label: "Metas y bonos",
          isTitle: false,
          icon: "uil-calender",
          url: "/metas",
        },
      ];
    }
    res.status(200).json({
      msg: "success",
      MENU_ITEMS,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de seccionGET, hable con el administrador: ${error}`,
    });
  }
};
const moduleGET = async (req = response, res = response) => {
  try {
    const { uid } = req;
    console.log(uid, "en modulo");
    const usuario = await Usuario.findOne({ where: { uid: uid } });
    // const { rol } = req.body;
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
          key: "mod-general-ventas",
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
    res.status(200).json({
      msg: "success",
      MODULOS_ITEMS,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de moduleGET, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  seccionPOST,
  moduloPOST,
  rolPOST,
  seccionGET,
  moduleGET,
};
