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