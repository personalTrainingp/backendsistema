const { response, request } = require("express");
const { validationResult } = require("express-validator");
const { getConnection } = require("../database/connectionSQLserver");
const { VarChar } = require("mssql");

const getModulos = async (req = request, res = response) => {
  const pool = await getConnection();
  const result = await pool.request().query(`
    select desc_modulo, desc_seccion from tb_moduloSeccion 
    inner join tb_modulo on tb_modulo.id_modulo=tb_moduloSeccion.id_modulo
    inner join tb_seccion on tb_seccion.id_seccion=tb_moduloSeccion.id_seccion  
    `);
  res.json(result.recordset);
};
const getModulo = async (req = request, res = response) => {
  const pool = await getConnection();
  const result = await pool.request().input("name", VarChar, ).query(`
      
    `);
  res.json(result.recordset);
};

module.exports = {
  getModulos,
};
