const { response, request } = require("express");
const { Gastos, ParametroGastos } = require("../models/GastosFyV");
const { Op } = require("sequelize");
const { Proveedor } = require("../models/Proveedor");
const { Empleado } = require("../models/Usuarios");
const { Parametros } = require("../models/Parametros");

const GastoPorCargo = async (req = response, res = response) => {

    const { fechaDesdeStr, fechaHastaStr } = req.query;

    console.log(fechaDesdeStr + " " + fechaHastaStr);
    let fechaDesde = new Date(fechaDesdeStr);
    let fechaHasta = new Date(fechaHastaStr);

    let responsePorEmpleado = {};
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
            let empleado;
            //response.push(proveedor);
            //console.log(proveedor.toJSON());
            if(proveedor.dni_vend_prov){
                empleado = await Empleado.findOne({
                    where: {
                        numDoc_Empl: proveedor.dni_vend_prov
                    }
                });

                if (empleado) {
                    let parametro = await Parametros.findOne({
                        where:{
                            grupo_param: 'tipo_oficio',
                            id_param: empleado.departamento_empl
                        }
                    });
             
                    if(parametro){
                        // console.log(empleado.toJSON());
                        //console.log(parametro.toJSON());
                        if (!responsePorEmpleado[empleado.numDoc_empl] ) {
                            responsePorEmpleado[empleado.numDoc_empl] = {  Departamento : parametro.label_param , TotalSalario : empleado.salario_empl};
                           // response[empleado.departamento_empl].TotalSalario = 0;
                        };
                        if (responsePorEmpleado[empleado.numDoc_empl]) {
                            responsePorEmpleado[empleado.numDoc_empl].TotalSalario += empleado.salario_empl;
                        };

                        if (!response[parametro.label_param] ) {
                            response[parametro.label_param] = {  /*Departamento : parametro.label_param ,*/ TotalSalario : empleado.salario_empl};
                           // response[empleado.departamento_empl].TotalSalario = 0;
                        };
                        if (response[parametro.label_param]) {
                            response[parametro.label_param].TotalSalario += empleado.salario_empl;
                        };
                    };
   
                };

            };

        }));

        // let ParametroGastos = await ParametroGastos.findOne({
        //     where:{
        //         id:659
        //     }
        // });
        // console.log(response);
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