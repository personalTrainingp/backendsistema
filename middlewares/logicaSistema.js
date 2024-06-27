const { request, response } = require("express");
const { detalleVenta_membresias, Venta } = require("../models/Venta");

const obtener_estado_membresia = async(req=request, res=response, next)=>{
    const {id_cli} = req.params;
    const membresia = await detalleVenta_membresias.findOne({
        include:[{
            model: Venta,
            where:{
                id_cli:id_cli
            }
        }]
    })
    
}
module.exports = {
obtener_estado_membresia
}