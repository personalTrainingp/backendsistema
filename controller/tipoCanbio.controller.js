const axios = require("axios");
const { response, request } = require("express");
const { TipoCambio } = require("../models/TipoCambio");
const {
  extraerTipoCambioDeSUNAT_FECHA_ACTUAL,
} = require("../middlewares/scrap_TIPO_CAMBIO_DOLAR");
const { Op } = require("sequelize");
const dayjs = require("dayjs");


const buscar = async (req = request , res =  response)=>{

  const { id } = req.params;
  let tipoCambio ;
  let response = "" ; 
  try {
    tipoCambio = await buscarMethod(id);
    response = "exito";

    if(!tipoCambio){
      throw new Error("No existe el tipo de cambio con ese id");
    }
  } catch (error) {
    response =  error.message;
  }
 
  if(!response  || response.includes("Error")){
    res.status(500).json({
      ok: false,
      tipoCambio: tipoCambio,
      response: response
    });
  }else{
    res.status(200).json({
      ok: true,
      tipoCambio: tipoCambio,
      response: response
    });
  }; 


};

async function buscarMethod(id) {

  const tipoCambio = await TipoCambio.findOne({
    where: {
      id: id
    }
  });
  return tipoCambio;
}

const eliminar = async (req = request , res = response)=>{
  const { id } = req.body;
  let response ;
  try {
    const tipoCambio = await buscarMethod(id);
    tipoCambio.flag = false;

    await tipoCambio.save();
    response = "exito";

  } catch (error) {
    response = error.message;
  }

  if(response == "exito"){

    res.status(200).json({
      ok: true,
      response: response,
    });

  }else{
    res.status(500).json({
      ok: false,
      //tipoCambio: tipoCambio,
      response: response
    });
  }

};

const crear = async(req = request , res = response)=>{

  const {fecha ,precio_compra , precio_venta , moneda} = req.body;
  let tipoCambio;
  let response;

  try {
     tipoCambio = await TipoCambio.create({
      fecha: fecha,
      precio_compra: precio_compra,
      precio_venta: precio_venta,
      moneda: moneda,
      flag: true
    });
    response = "exito";

  } catch (error) {
    response = error.message;
  }

  if(tipoCambio || response === "exito"){

    res.status(200).json({
      ok: true,
      response: response,
      tipoCambio: tipoCambio
    });

  }else{
    res.status(500).json({
      ok: false,
      //tipoCambio: tipoCambio,
      response: response
    });
  }

};

const actualizar = async(req = request , res = response)=>{

  const {id, fecha ,precio_compra , precio_venta , moneda} = req.body;
  let response ;
  let tipoCambio;

  try {

    tipoCambio = await TipoCambio.update({
      fecha: fecha,
      precio_compra:precio_compra,
      precio_venta:precio_venta,
      moneda:moneda,
    
    },{
      where:{
        id:id
      }
    });

    tipoCambio = await buscarMethod(id);

    response = "exito";
  } catch (error) {
    response = error.message;
  }
  
  if(tipoCambio || response === "exito"){

    res.status(200).json({
      ok: true,
      response: response,
      tipoCambio: tipoCambio
    });

  }else{
    res.status(500).json({
      ok: false,
      //tipoCambio: tipoCambio,
      response: response
    });
  }

};


const obtenerTipoCambioxFecha = async (req = request, res = response) => {
  // const { fecha } = req.query;
  const token = "apis-token-9259.J4rGm7r47gM81tbpyuFuNaFaod1QfRWS";
  // console.log(fecha);

  try {
    // Buscar en la base de datos
    // const tipoCambio = await TipoCambio.findOne({ where: { fecha } });

    // if (tipoCambio) {
    //   // Retornar datos si existen en la base de datos
    //   return res.status(200).json({
    //     msg: "success",
    //     data: tipoCambio, // Devolver los datos desde la base de datos
    //   });
    // }
    const respuesta = await extraerTipoCambioDeSUNAT_FECHA_ACTUAL();
    // const nuevoTipoCambio = await TipoCambio.create({
    //   fecha: fecha,
    //   precio_compra: respuesta.precio_compra, // Ajusta según los campos que devuelva la API
    //   precio_venta: respuesta.precio_venta, // Ajusta según los campos que devuelva la API
    //   moneda: respuesta.moneda,
    // });

    res.status(200).json({
      msg: "success con rsp",
      data: respuesta, // Extraer solo los datos de la respuesta
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de obtenerTipoCambioxFecha, hable con el administrador: ${error}`,
    });
  }
};
const obtenerTipoCambiosxFechas = async (req = request, res = response) => {
  const { arrayDate } = req.query;
  // console.log(
  //   dayjs(new Date(arrayDate[0])).format("YYYY-MM-DD"),
  //   dayjs(new Date(arrayDate[1])).format("YYYY-MM-DD")
  // );

  try {
    const Cambio = await TipoCambio.findAll({
      where: {
        fecha: {
          [Op.between]: [
            dayjs(new Date(arrayDate[0])).format("YYYY-MM-DD"),
            dayjs(new Date(arrayDate[1])).format("YYYY-MM-DD"),
          ],
        },
      },
      attributes: ["moneda", "fecha", "precio_compra", "precio_venta"],
    });
    console.log(Cambio);

    res.status(200).json({
      msg: "success",
      data: Cambio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de obtenerTipoCambioxFecha, hable con el administrador: ${error}`,
    });
  }
};
const updateTipoCambio = async(req=request, res=response)=>{
  const { id_tc } = req.params;
  try {
    const tipoCambio = await TipoCambio.findAll({
      where:{
        id: id_tc
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de postTipoCambio, hable con el administrador: ${error}`,
    });
  }
}
const postTipoCambio = async (req = request, res = response) => {
  try {
    const tipoCambio = new TipoCambio(req.body);
    tipoCambio.save();
    res.status(200).json({
      msg: "success",
      data: tipoCambio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de postTipoCambio, hable con el administrador: ${error}`,
    });
  }
};
const obtenerTipoCambio = async (req = request, res = response) => {
  try {
    const tipoCambio = await TipoCambio.findAll({
      where: {
        flag: true,
      },
      attributes: ["id", "moneda", "fecha", "precio_compra", "precio_venta"],
    });

    res.status(200).json({
      msg: "success",
      tipoCambio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Error en el servidor, en controller de obtenerTipoCambioxFecha, hable con el administrador: ${error}`,
    });
  }
};
module.exports = {
  obtenerTipoCambioxFecha,
  obtenerTipoCambiosxFechas,
  obtenerTipoCambio,
  postTipoCambio,
  buscar,
  eliminar,
  crear,
  actualizar
};
