const { DataTypes } = require("sequelize");
const { db } = require("../database/sequelizeConnection");

const ExtensionMembresia = db.define("tb_extension_membresia", {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
})

module.exports = {
    ExtensionMembresia
}