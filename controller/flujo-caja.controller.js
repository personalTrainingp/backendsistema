const { request, response } = require("express");
const {
  Venta,
  detalleVenta_producto,
  detalleVenta_membresias,
  detalleVenta_citas,
  detalleVenta_pagoVenta,
  detalleVenta_Transferencia,
} = require("../models/Venta");
const { Producto } = require("../models/Producto");
const { Servicios } = require("../models/Servicios");
const { Op, Sequelize } = require("sequelize");
const { Proveedor } = require("../models/Proveedor");
const { ParametroGastos, Gastos } = require("../models/GastosFyV");
const { Parametros } = require("../models/Parametros");

const getIngresosxMESandAnio = async (req = request, res = response) => {
  const { mes, anio } = req.query;
  try {
    const ventasProgramas = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_membresias,
          required: true,
          attributes: [
            "id_venta",
            "id_pgm",
            "id_tarifa",
            "horario",
            "id_st",
            "tarifa_monto",
          ],
        },
      ],
    });
    const ventasCitasTipoNutri = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "tarifa_monto"],
          required: true,
          include: [
            {
              model: Servicios,
              attributes: ["id", "tipo_servicio", "nombre_servicio"],
              where: { tipo_servicio: "NUTRI" },
            },
          ],
        },
      ],
    });
    const ventasCitasTipoFito = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "tarifa_monto"],
          include: [
            {
              model: Servicios,
              required: true,
              attributes: ["id", "tipo_servicio", "nombre_servicio"],
              where: { tipo_servicio: "FITOL" },
            },
          ],
        },
      ],
    });
    const ventasProductos18 = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          required: true,
          include: [
            {
              model: Producto,
              attributes: ["id", "id_categoria"],
              where: { id_categoria: 18 },
            },
          ],
        },
      ],
    });
    const ventasProductos17 = await Venta.findAll({
      where: {
        flag: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("fecha_venta")),
            mes
          ),
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fecha_venta")),
            anio
          ),
        ],
      },
      attributes: [
        "id",
        "id_cli",
        "id_empl",
        "id_tipoFactura",
        "numero_transac",
        "fecha_venta",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: detalleVenta_producto,
          attributes: [
            "id_venta",
            "id_producto",
            "cantidad",
            "precio_unitario",
            "tarifa_monto",
          ],
          required: true,
          include: [
            {
              model: Producto,
              attributes: ["id", "id_categoria"],
              where: { id_categoria: 17 },
            },
          ],
        },
      ],
    });
    // Sumar todas las tarifas
    const programa_MONTO = ventasProgramas.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaMembresia?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const citasNutri_MONTO = ventasCitasTipoNutri.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaCitas?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const citasFito_MONTO = ventasCitasTipoFito.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaCitas?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const producto18_MONTO = ventasProductos18.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaProductos?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);
    const producto17_MONTO = ventasProductos17.reduce((total, venta) => {
      const sumaTarifa = venta?.detalle_ventaProductos?.reduce(
        (subTotal, detalle) => subTotal + (detalle.tarifa_monto || 0),
        0
      );
      return total + sumaTarifa;
    }, 0);

    res.status(200).json({
      ok: true,
      data: {
        programa_MONTO,
        citasNutri_MONTO,
        citasFito_MONTO,
        producto18_MONTO,
        producto17_MONTO,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(501).json({
      msg: "Invalid",
      error: error,
    });
  }
};

const getGastosMensualesxANIO = async (req = request, res = response) => {
  const { anio } = req.query;
  try {
    res.status(200).json({
      ok: true,
      data: "",
    });
  } catch (error) {
    res.status(501).json({
      ok: true,
      data: "",
    });
  }
};

const getGastoxGrupo = async (req = request, res = response) => {
  const { anio } = req.query;
  const { id_enterp } = req.params;
  try {
    const gastos = await Gastos.findAll({
      where: {
        flag: true,
        [Sequelize.Op.and]: Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("fec_comprobante")),
          "<",
          2030,
          Sequelize.fn("YEAR", Sequelize.col("fec_comprobante")),
          "=",
          2024
        ),
        id: {
          [Sequelize.Op.not]: 2548,
        },
      },
      order: [["fec_registro", "desc"]],
      attributes: [
        "id",
        "moneda",
        "monto",
        "fec_pago",
        "id_tipo_comprobante",
        "n_comprabante",
        "impuesto_igv",
        "impuesto_renta",
        "n_operacion",
        "fec_registro",
        "fec_comprobante",
        "descripcion",
        "id_prov",
        "cod_trabajo",
      ],
      include: [
        {
          model: Proveedor,
          attributes: ["razon_social_prov"],
        },
        {
          model: ParametroGastos,
          attributes: ["id_empresa", "nombre_gasto", "grupo", "id_tipoGasto"],
          where: {
            id_empresa: id_enterp,
          },
        },
        {
          model: Parametros,
          attributes: ["id_param", "label_param"],
          as: "parametro_banco",
        },
        {
          model: Parametros,
          attributes: ["id_param", "label_param"],
          as: "parametro_forma_pago",
        },
        {
          model: Parametros,
          attributes: ["id_param", "label_param"],
          as: "parametro_comprobante",
        },
      ],
    });
    res.status(200).json({
      msg: "success",
      gastos,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getGastos, hable con el administrador: ${error}`,
    });
  }
};
const getCreditoFiscal = async (req = request, res = response) => {
  const { id_enterp } = req.params;
  const { anio } = req.query;
  try {
    const facturas = await Gastos.findAll({
      raw: true,
      where: {
        flag: true,
        esCompra: true,
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("fec_comprobante")),
            "<",
            2030
          ),
        ],
        id: {
          [Sequelize.Op.not]: 2548,
        },
      },
      order: [["fec_registro", "desc"]],
      attributes: ["id", "monto", ["fec_comprobante", "fecha_monto"]],
      include: [
        {
          model: ParametroGastos,
          attributes: ["id_empresa"],
          where: {
            id_empresa: id_enterp,
          },
        },
      ],
    });
    const ventas = await Venta.findAll({
      where: { flag: true, id_empresa: id_enterp },
      attributes: ["id", "fecha_venta"],
      order: [["id", "DESC"]],
      raw: true,
      include: [
        {
          model: detalleVenta_producto,
          attributes: ["id_venta", "tarifa_monto"],
        },
        {
          model: detalleVenta_membresias,
          attributes: ["id_venta", "id_st", "tarifa_monto"],
        },
        {
          model: detalleVenta_citas,
          attributes: ["id_venta", "id_servicio", "tarifa_monto"],
        },
      ],
    });

    // console.log(
    //   "SUMA FACTURAS: ",
    //   sumarMontoSinAnio(
    //     completarMesesFaltantes(ordenarxMESXANIO___GASTOS(facturas)),
    //     2024
    //   ),
    //   "SUMA VENTAS: ",
    //   sumarMontoSinAnio(completarMesesFaltantes(ordenarxMESXANIO(ventas)), 2024)
    // );

    // console.log(
    //   "IGV VENTAS: ",
    //   IGVSUMADO(
    //     sumarMontoSinAnio(
    //       completarMesesFaltantes(ordenarxMESXANIO(ventas)),
    //       2024
    //     )
    //   ),
    //   "IGV FACTURAS: ",
    //   IGVSUMADO(
    //     sumarMontoSinAnio(
    //       completarMesesFaltantes(ordenarxMESXANIO___GASTOS(facturas)),
    //       2024
    //     )
    //   )
    // );

    // console.log(
    //   IGVSUMADO(
    //     sumarMontoSinAnio(
    //       completarMesesFaltantes(ordenarxMESXANIO(ventas)),
    //       2024
    //     )
    //   ) -
    //     IGVSUMADO(
    //       sumarMontoSinAnio(
    //         completarMesesFaltantes(ordenarxMESXANIO___GASTOS(facturas)),
    //         2024
    //       )
    //     ),
    //   "credito fiscal de anios anteriores"
    // );

    const IGVVENTAS = IGVxMESES(
      completarMesesFaltantes(ordenarxMESXANIO(ventas))
    );
    const IGVFACTURAS = IGVxMESES(
      completarMesesFaltantes(ordenarxMESXANIO___GASTOS(facturas))
    );

    res.status(200).json({
      msg: "success",
      creditoFiscalAniosAnteriores:
        sumarMontoSinAnio(IGVVENTAS, anio) -
        sumarMontoSinAnio(IGVFACTURAS, anio),
      facturas: IGVFACTURAS.filter((f) => f.anio === Number(anio)),
      ventas: IGVVENTAS.filter((f) => f.anio === Number(anio)),
    });
  } catch (error) {
    res.status(500).json({
      error: `Error en el servidor, en controller de getGastos, hable con el administrador: ${error}`,
    });
  }
};
function IGVSUMADO(data) {
  const sumaVentas = data;
  const baseIGV = sumaVentas / 1.18;
  const igvVentas = baseIGV * 0.18;
  return igvVentas;
}

const IGVxMESES = (data) => {
  return data.map((d) => {
    return {
      igv: (d.monto_final / 1.18) * 0.18,
      ...d,
    };
  });
};

function sumarMontoSinAnio(datos, anioExcluido) {
  return datos
    .filter((item) => item.anio < anioExcluido) // Filtrar los objetos que no sean del año excluido
    .reduce((total, item) => total + item.igv, 0); // Sumar los monto_final
}
// Función para obtener el mes y año de una fecha
const ordenarxMESXANIO = (data) => {
  // 1. Sumar los montos dentro de cada objeto
  const withTotalAmount = data.map((obj) => {
    const totalMonto =
      (obj["detalle_ventaProductos.tarifa_monto"] || 0) +
      (obj["detalle_ventaMembresia.tarifa_monto"] || 0) +
      (obj["detalle_ventaCitas.tarifa_monto"] || 0);
    return {
      ...obj,
      monto_total: totalMonto,
    };
  });

  // 2. Agrupar por mes y año
  const groupedByMonthYear = withTotalAmount.reduce((acc, obj) => {
    const date = new Date(obj.fecha_venta);
    const mes = date.getMonth() + 1; // Mes en formato 1-12
    const anio = date.getFullYear();
    const key = `${mes}-${anio}`;

    if (!acc[key]) {
      acc[key] = { mes, anio, monto_final: 0, items: [] };
    }

    acc[key].monto_final += obj.monto_total;
    // acc[key].items.push(obj);

    return acc;
  }, {});

  // 3. Convertir el objeto agrupado en un array y ordenar por mes y año
  const result = Object.values(groupedByMonthYear).sort((a, b) => {
    if (a.anio === b.anio) {
      return a.mes - b.mes;
    }
    return a.anio - b.anio;
  });
  return result;
};
function completarMesesFaltantes(arr) {
  // Crear un nuevo array para almacenar los resultados completos
  let resultado = [];

  // Encontrar el rango de años en los datos
  let anios = [...new Set(arr.map((item) => item.anio))];

  // Iterar sobre cada año en el rango
  anios.forEach((anio) => {
    // Filtrar los elementos del año actual
    let mesesEnAnio = arr.filter((item) => item.anio === anio);
    let mesesExistentes = mesesEnAnio.map((item) => item.mes);

    // Agregar los meses faltantes con monto_final en 0
    for (let mes = 1; mes <= 12; mes++) {
      if (!mesesExistentes.includes(mes)) {
        resultado.push({
          mes: mes,
          anio: anio,
          monto_final: 0,
          items: [],
        });
      }
    }

    // Añadir los meses existentes para el año actual al resultado
    resultado = resultado.concat(mesesEnAnio);
  });

  // Ordenar el array final por año y mes
  resultado.sort((a, b) =>
    a.anio === b.anio ? a.mes - b.mes : a.anio - b.anio
  );

  return resultado;
}
const ordenarxMESXANIO___GASTOS = (data) => {
  return data.reduce((acc, item) => {
    // Obtener el año y mes de la fecha
    const fecha = new Date(item.fecha_monto);
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

    // Crear una clave única para agrupar por año y mes
    const key = `${anio}-${mes < 10 ? "0" + mes : mes}`;

    // Buscar si ya existe un objeto en el array con este mes y año
    const existingGroup = acc.find(
      (group) => group.mes === mes && group.anio === anio
    );

    if (existingGroup) {
      // Si ya existe, sumar el monto y agregar el item a 'items'
      existingGroup.monto_final += item.monto;
      //   existingGroup.items.push(item);
    } else {
      // Si no existe, crear un nuevo grupo
      acc.push({
        mes,
        anio,
        monto_final: item.monto,
        // items: [item],
      });
    }

    return acc;
  }, []);
};

module.exports = {
  getIngresosxMESandAnio,
  getGastoxGrupo,
  getCreditoFiscal,
};
