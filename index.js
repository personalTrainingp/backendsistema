const express = require("express");
const cors = require("cors");
const { urlArchivos, urlArchivoLogos } = require("./config/constant");
const { db } = require("./database/sequelizeConnection.js");
const { ImagePT } = require("./models/Image.js");
const transporterU = require("./config/nodemailer.js");
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
const sendReminderEmail = (email) => {
  const mailOptions = {
    from: "notificaciones@personaltraining.com.pe",
    to: `${email}`,
    subject: "Asunto del correo",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${EMAIL_INFO.nombre_cli}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
            }
    
    
            th {
                background-color: #f2f2f2;
            }
    
            .logo {
                width: 400px;
                margin: 0 auto;
                display: block;
            }
    
            .text-center {
                text-align: center;
            }
    
            .bold {
                font-weight: bold;
            }
            .bg-primary{
                background-color: #FF5000;
            }
            .bg-black{
                background-color: #000;
            }
            .m-0{
                margin: 0;
            }
            .color-white{
                color: #fff;
            }
            .body-table{
                display: flex;
                justify-content: center;
            }
            .dflex-jcenter{
                display: flex;
                justify-content: center;
            }
            .table-info tr{
                display: flex;
                justify-content: center;
            }
            .table-info td{
                width: 100%;
            }
            .table-info .param{
                text-align: right;
            }
            .table-info tr{
                margin-bottom: 5px;
            }
            .table-info{
                font-size: 18px;
            }
            
        </style>
    </head>
    
    <body>
            Este mensaje a sido enviando 10 dias antes de tu membresia
    </body>
    
    </html>
      `,
  };
  transporterU.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Correo electrónico enviado: " + info.response);
    }

    // Cerrar la conexión SMTP
    transporterU.close();
  });
};
const checkMembresiaShips = () => {
  const today = new Date();
  const reminderToday = new Date();
  reminderToday.setDate(today.getDate() + 10);
  try {
  } catch (error) {
    console.error("Error checking memberships:", error);
  }
};

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

app.use("/api/reporte", require("./routes/reporte.router.js"));
app.use("/api/comision", require("./routes/comision.router.js"));

//TODO: FORMA PAGO
app.use("/api/formPago", require("./routes/formaPago.router.js"));
app.use("/api/rol", require("./routes/roles.router.js"));
app.use("/api/venta", require("./routes/venta.router.js"));
app.use("/api/serviciospt", require("./routes/serviciosPT.router.js"));

app.use("/api/cita", require("./routes/cita.router.js"));
app.use("/api/prospecto", require("./routes/prospecto.router.js"));
app.use("/api/auditoria", require("./routes/auditoria.router.js"));

//Escuchar peticiones
app.listen(env.PORT || 4001, () => {
  console.log(`Servidor corriendo en el puerto ${env.PORT || 4001}`);
});
