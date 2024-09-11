const nuevos = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: detalleVenta_membresias,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    id_cli: {
      [Op.notIn]: literal(`(
                SELECT id_cli
                FROM tb_venta v2
                JOIN detalle_ventaMembresia dm2 ON v2.id = dm2.id_venta
                WHERE v2.fecha_venta < '${dateRanges[0]}'
            )`),
    },
  },
  group: ["id_cli"],
});
const reinscritos = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: detalleVenta_membresias,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    [Op.and]: literal(`EXISTS (
            SELECT 1
            FROM tb_venta v2
            JOIN tb_detalle_membresia dm2 ON v2.id = dm2.id_venta
            WHERE v2.id_cli = tb_venta.id_cli
            AND dm2.fec_fin_mem < tb_detalle_membresia.fec_inicio_mem
        )`),
  },
  group: ["id_cli"],
});
const renovados = await Venta.findAll({
  attributes: ["id_cli"],
  include: [
    {
      model: DetalleMembresia,
      attributes: [],
      where: {
        fec_inicio_mem: {
          [Op.between]: [dateRanges[0], dateRanges[1]],
        },
      },
    },
    {
      model: ExtensionMembresia,
      attributes: [],
    },
  ],
  where: {
    fecha_venta: {
      [Op.between]: [dateRanges[0], dateRanges[1]],
    },
    [Op.and]: literal(`EXISTS (
            SELECT 1
            FROM tb_venta v2
            JOIN detalle_ventaMembresia dm2 ON v2.id = dm2.id_venta
            WHERE v2.id_cli = tb_venta.id_cli
            AND DATEADD(DAY, tb_extension_membresia.dias_habiles, dm2.fec_fin_mem) >= detalle_ventaMembresia.fec_inicio_mem
        )`),
  },
  group: ["id_cli"],
});

/*
  SEGUIMIENTO EN TRATCH

  
    let membresias = await detalleVenta_membresias.findAll({
      attributes: ["id", "fec_inicio_mem", "fec_fin_mem"],
      // limit: 20,
      order: [["id", "DESC"]],
      include: [
        {
          model: ExtensionMembresia,
          attributes: [
            "tipo_extension",
            "extension_inicio",
            "extension_fin",
            "dias_habiles",
          ],
        },
        {
          model: Venta,
          attributes: ["id", "fecha_venta"],
          raw: true,
          include: [
            {
              model: Cliente,
              attributes: [
                "id_cli",
                [
                  Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("nombre_cli"),
                    " ",
                    Sequelize.col("apPaterno_cli"),
                    " ",
                    Sequelize.col("apMaterno_cli")
                  ),
                  "nombres_apellidos_cli",
                ],
                "email_cli",
              ],
            },
          ],
        },
        {
          model: ProgramaTraining,
          attributes: ["id_pgm", "name_pgm"],
          where: { estado_pgm: true, flag: true },
          include: [
            {
              model: ImagePT,
              attributes: ["name_image", "id"],
            },
          ],
        },
        {
          model: SemanasTraining,
          attributes: ["id_st", "semanas_st"],
        },
      ],
    });
    const currentDate = new Date();
    let newMembresias = membresias
      .map((item) => {
        const itemJSON = item.toJSON();
        const tbExtensionMembresia = itemJSON.tb_extension_membresia || [];

        if (tbExtensionMembresia.length === 0) {
          // Si tb_extension_membresia está vacío
          return {
            ...itemJSON,
            dias: 0,
            fec_fin_mem_new: itemJSON.fec_fin_mem, // La nueva fecha es igual a fec_fin_mem
          };
        }
        const totalDiasHabiles = (itemJSON.tb_extension_membresia || []).reduce(
          (total, ext) => total + parseInt(ext.dias_habiles, 10),
          0
        );

        // Calcular la nueva fecha sumando los días hábiles a 'fec_fin_mem'
        const fecFinMem = new Date(itemJSON.fec_fin_mem);
        const fecFinMemNew = addBusinessDays(fecFinMem, totalDiasHabiles);
        return {
          dias: totalDiasHabiles,
          // diasPorTerminar: diasLaborables(new Date(), fecFinMemNew.toISOString()),
          fec_fin_mem_new: fecFinMemNew.toISOString(), // Ajusta el formato según tus necesidades
          ...itemJSON,
        };
      })
      .filter((item) => {
        const fecFinMemNewDate = new Date(item.fec_fin_mem_new);
        if (isClienteActive === "true") {
          return fecFinMemNewDate > currentDate;
        } else if (isClienteActive === "false") {
          return fecFinMemNewDate < currentDate;
        }
        return true; // Sin filtro si isClienteActive no está definido
      })
      .sort((a, b) => {
        const dateA = new Date(a.fec_fin_mem_new);
        const dateB = new Date(b.fec_fin_mem_new);
        if (isClienteActive === "true") {
          return dateA - dateB; // Ordenar de menor a mayor
        } else if (isClienteActive === "false") {
          return dateB - dateA; // Ordenar de mayor a menor
        }
        return 0; // No aplicar orden si isClienteActive no está definido
      });
    // Filtrar para mantener solo el objeto con la fecha_venta más reciente para cada cliente
    const uniqueClientes = new Map();
    newMembresias.forEach((item) => {
      const idCli = item.tb_ventum.tb_cliente.id_cli;
      const currentItem = uniqueClientes.get(idCli);

      if (
        !currentItem ||
        new Date(item.tb_ventum.fecha_venta) >
          new Date(currentItem.tb_ventum.fecha_venta)
      ) {
        uniqueClientes.set(idCli, item);
      }
    });

    newMembresias = Array.from(uniqueClientes.values());
  */
