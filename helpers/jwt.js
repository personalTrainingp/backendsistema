const jwt = require("jsonwebtoken");

const generarJWT = (uid, name, rol_user, ip_user, id_user) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, rol_user, ip_user, id_user };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
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
