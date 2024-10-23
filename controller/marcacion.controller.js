const { Model } = require("sequelize");
const { Marcacion } = require("../models/Marcacion");
const { Cliente } = require("../models/Usuarios");

const obtenerAsistenciaDeClientes = async (req, res) => {
  const { id_enterprice } = req.params;
  try {
    const asistencia = await Marcacion.findAll({
      where: {
        id_empresa: id_enterprice,
      },
      order: [["id", "DESC"]],
    });
    res.status(200).json({ asistencia });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener asistencia de clientes" });
  }
};

const obtenerAsistenciaPorClientes = async (req, res) => {

  let response ;
  let asistenciaPorCliente = {};
  try {
    const TodasAsistencias = await Marcacion.findAll({
      include:[
        {
          model: Cliente,
          required: true,
        }
      ]
    });

    TodasAsistencias.map((asistencia)=>{
      if(!asistenciaPorCliente[asistencia.tb_cliente.numDoc_cli]){
        asistenciaPorCliente[asistencia.tb_cliente.numDoc_cli] = {
          nombre_apellidos_cli: asistencia.tb_cliente.nombre_cli+ " " +  asistencia.tb_cliente.apPaterno_cli + " " + asistencia.tb_cliente.apMaterno_cli,
          email: asistencia.tb_cliente.email_cli,
          telefono: asistencia.tb_cliente.tel_cli,
          dni: asistencia.tb_cliente.numDoc_cli,
          asistencias: [],
        }
      };
      if(asistenciaPorCliente[asistencia.tb_cliente.numDoc_cli]){
        asistenciaPorCliente[asistencia.tb_cliente.numDoc_cli].asistencias.push(asistencia);
      };
    });
    

    let agruparPorIdCliFechasPorDia ={} ;
    for(let key in asistenciaPorCliente){
      let asistenciasSoloCliente =asistenciaPorCliente[key].asistencias; 
      let nombresApellidos = asistenciaPorCliente[key].nombre_apellidos_cli;
      let email = asistenciaPorCliente[key].email;
      let telefono = asistenciaPorCliente[key].telefono;
      let dni = asistenciaPorCliente[key].dni;
      let fecha ;
      let contador ;
      let fechas = {};

      asistenciasSoloCliente.map((asistencia)=>{
        fecha = new Date (asistencia.tiempo_marcacion);
        const dia = fecha.toISOString().split("T")[0];

        if(!agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli]){
          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli] ={};
        };

        if(!agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli][dia]){
          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli].nombre_apellidos_cli = nombresApellidos;
          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli].email = email;
          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli].telefono = telefono;
          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli].dni = dni;


          agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli][dia] = [];
        };
        agruparPorIdCliFechasPorDia[asistencia.tb_cliente.numDoc_cli][dia].push(fecha);

      });
    };
 
    let fechaMasRecientePorCliente={
      clientes:[],
    };

    for( let key in agruparPorIdCliFechasPorDia){
      for( let key2  in  agruparPorIdCliFechasPorDia[key]){
          let fechaMasReciente;
          let fechaUltima;

          let currecCliente = {
            dni: agruparPorIdCliFechasPorDia[key].dni,
            nombre_apellidos_cli : agruparPorIdCliFechasPorDia[key].nombre_apellidos_cli,
            email : agruparPorIdCliFechasPorDia[key].email,
            telefono : agruparPorIdCliFechasPorDia[key].telefono,
            dias : [],
          } ;
          let dia ={
            fecha: key2,
            FechaMasReciente: [],
            FechaUltima:[],
          };

          if(new Date(agruparPorIdCliFechasPorDia[key][key2])){
            fechaMasReciente = new Date(Math.max(...agruparPorIdCliFechasPorDia[key][key2]));
            fechaUltima = new Date(Math.max(...agruparPorIdCliFechasPorDia[key][key2]));
          };

          if (fechaMasReciente) {
            if ((key2 !== "nombre_apellidos_cli") && (key2 !== "email") && (key2 !== "telefono") && (key2 !== "dni") ) {
              
              dia.fecha = key2;
              dia.FechaMasReciente.push(fechaMasReciente);
              dia.FechaUltima.push(fechaUltima);
              currecCliente.dias.push(dia);

              let clienteEcontrado = fechaMasRecientePorCliente.clientes.filter(cliente => cliente.dni === currecCliente.dni);
              if (clienteEcontrado.length > 0) {
               
                console.log(clienteEcontrado);
                clienteEcontrado[0].dias.push(dia);
              }else{
                fechaMasRecientePorCliente.clientes.push(currecCliente);
              };
            };
          };

            // if(!fechaMasRecientePorCliente[key]){
            //   //fechaMasRecientePorCliente[key].nombre_apellidos_cli  = "";//agruparPorIdCliFechasPorDia[key].nombre_apellidos_cli;
            //   fechaMasRecientePorCliente[key] = {};
            //   fechaMasRecientePorCliente[key].nombre_apellidos_cli = agruparPorIdCliFechasPorDia[key].nombre_apellidos_cli;
            //   fechaMasRecientePorCliente[key].email = agruparPorIdCliFechasPorDia[key].email;
            //   fechaMasRecientePorCliente[key].telefono = agruparPorIdCliFechasPorDia[key].telefono;

            // };
            // if(!fechaMasRecientePorCliente[key][key2]) {
            //   fechaMasRecientePorCliente[key][key2] = [];
            // }
            // if (fechaMásReciente) {
            //   if ((key2 !== "nombre_apellidos_cli")&& (key2 !== "email")&&(key2 !== "telefono")) {
            //     fechaMasRecientePorCliente[key][key2].push(fechaMásReciente);
            //   }
            // };
        }

 
    };

    //console.log(fechaMasRecientePorCliente);

    res.status(200).json({ FechaMasRecienteAsistencia: fechaMasRecientePorCliente });
  } catch (error) {
    response = error;

    res
    .status(500)
    .json({ message: error.message });
  }

}


module.exports = {
  obtenerAsistenciaDeClientes,
  obtenerAsistenciaPorClientes
};
