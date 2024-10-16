const { response, request } = require("express");
const { Gastos, ParametroGastos } = require("../models/GastosFyV");
const { Op } = require("sequelize");
const { Proveedor } = require("../models/Proveedor");
const { Empleado } = require("../models/Usuarios");

const GastoPorCargo = async (req = response, res = response) => {

    const { fechaDesde, fechaHasta } = req.body;

    let response = {};

    try {


        let gastos = await Gastos.findAll({
            where: {
                fec_registro: {
                    [Op.between]: [fechaDesde, fechaHasta]
                },
                id_gasto: 659,
            }

        });

        await Promise.all(gastos.map(async (gasto) => {

            let proveedor = await Proveedor.findOne({
                where: {
                    id: gasto.id_prov
                }
            });

            //response.push(proveedor);

            let empleado = await Empleado.findOne({
                where: {
                    numDoc_Empl: proveedor.dni_vend_prov
                }
            });

           // response.push(empleado);

            // //empleado.cargo_empl
        
            if (!response[empleado.departamento_empl] && empleado) {
                response[empleado.departamento_empl] = {  Departamento : empleado.departamento_empl , TotalSalario : 0 };
               // response[empleado.departamento_empl].TotalSalario = 0;
            };
            if (response[empleado.departamento_empl] && empleado) {
                response[empleado.departamento_empl].TotalSalario = empleado.salario_empl;
            };



        }));

        // let ParametroGastos = await ParametroGastos.findOne({
        //     where:{
        //         id:659
        //     }
        // });

        res.status(200).json({
            ok: true,
            response: response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            response: error
        });
    }
};
module.exports = {
    GastoPorCargo
}