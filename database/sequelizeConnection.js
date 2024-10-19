const { Sequelize } = require("sequelize");
const env = process.env;

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize("db_luroga", env.USER_DB, env.PASSWORD_DB, {
  host: env.HOST,
  dialect: "mssql",
  logging: false,
  pool:{
    max:5,
    min:0,
    acquire:60000,
    idle:10000
  }
});

module.exports = {
  db,
};
