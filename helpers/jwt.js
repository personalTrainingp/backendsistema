const jwt = require("jsonwebtoken");

const generarJWT = (uid, name, rol_user, ip_user, id_user) => {
  // console.log(id_user, "en jwt, en llamada");

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
  if (rol_user === 7) {
    MODULOS_ITEMS = [
      {
        name: "MARKETING",
        path: "/marketing",
        key: "mod-marketing",
      },
    ];
  }
  if (rol_user === 6) {
    MODULOS_ITEMS = [
      {
        name: "MARKETING",
        path: "/marketing",
        key: "mod-marketing",
      },
    ];
  }
  return new Promise((resolve, reject) => {
    const payload = { uid, name, rol_user, ip_user, id_user };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "168h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo resolver el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = generarJWT;
