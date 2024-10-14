const mssql = require("mssql");
const connectionSettings = {
  server: "localhost",
  database: "bd_PersonalTrainer",
  user: "user_sa",
  password: "Perro123",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const getConnection = async () => {
  try {
    const pool = await mssql.connect(connectionSettings);
    console.log("conexion exitosa a sqlServer");
    return pool;
  } catch (error) {
    console.log("algo paso con la conexion");
    console.log(error);
  }
};
module.exports = {
  getConnection,
};
