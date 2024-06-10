const express = require("express");
const cors = require("cors");
const { urlArchivos, urlArchivoLogos } = require("./config/constant");
const { db } = require("./database/sequelizeConnection.js");
const { ImagePT } = require("./models/Image.js");
const fileServer = express.static;
require("dotenv").config();
const env = process.env;

//Creando el servidor de express
const app = express();

//Base de datos
//dbConnection()
// getConnection();

const getConnectionORM = async () => {
  try {
    await db.authenticate();
    // await ImagePT.sync({ force: true });
    console.log("Conexion exitosa a la base de datos con ORM sequalize");
  } catch (error) {
    console.error("Error al conectar a la base de datos con sequelize:", error);
  }
};
getConnectionORM();
//CORS
app.use(cors());

//Directorio publico
app.use(express.static("public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Lectura y parseo del body
app.use(express.json());

//RUTA FILES
app.use("/api/file", fileServer(urlArchivos));
app.use("/api/file/logo", fileServer(urlArchivoLogos));
//Rutas
// //TODO proveedores // sexo, tipoDoc, estadoCivil, etc
app.use("/api/proveedor", require("./routes/proveedor.router.js"));
app.use("/api/producto", require("./routes/producto.route.js"));
//TODO: JUNTAR LOS DOS EN UNA RUTA
app.use("/api/egreso", require("./routes/gastos.router.js"));
//TODO: programas
app.use("/api/programaTraining", require("./routes/programaTraining.route.js"));
//TODO: PARAMETROS TODO TIPO(SEXO, TIPO DOC, NACIONALIDAD, TIPOCLIENTE, REFERENCIA DE CONTACTO, ETC)
app.use("/api/parametros", require("./routes/parametros.route.js"));
//TODO: USUARIOS(CLIENTES, COLABORADORES, USUARIOS LOGEADOS)
app.use("/api/usuario", require("./routes/usuario.route.js"));
app.use("/api/servicios", require("./routes/servicios.router.js"));

app.use("/api/meta", require("./routes/meta.route.js"));
app.use("/api/impuestos", require("./routes/impuestos.router.js"));
//TODO upload // imgs
app.use("/api", require("./routes/upload/upload.routes.js"));

//TODO: FORMA PAGO
app.use("/api/formPago", require("./routes/formaPago.router.js"));
app.use("/api/rol", require("./routes/roles.router.js"));
app.use("/api/venta", require("./routes/venta.router.js"));
app.use("/api/serviciospt", require("./routes/serviciosPT.router.js"));

app.use("/api/cita", require("./routes/cita.router.js"));

//Escuchar peticiones
app.listen(env.PORT || 4001, () => {
  console.log(`Servidor corriendo en el puerto ${env.PORT || 4001}`);
});
