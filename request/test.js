const testCompra = {
  id_venta: "V123",
  usuario: "Alvaro",
  asesor: "Alvaro",
  cliente: "Ana Maria Gabriela",
  tipo_cliente: "nuevo",
  tipo_transaccion: "Boleta",
  numero_transaccion: "144",
  Detalle_venta_programa: [
    {
      id: 1,
      id_venta: "V123",
      cantidad: "1",
      id_programa: "2",
      programa_semanas: "4",
      tarifa_nombre: "Promocion 50% Noviembre", //id_tarifa
      tarifa_precio: "21231.00",
      uid_firma_cliente: "4", // Si no hay firma colocar "0"
      inicio_programa: "2/2/2024",
      fin_programa: "2/3/2024",
      horario_programa: "06:00 am", //id_horario
    },
  ],
  Detalle_venta_fitology: [
    {
      id: 1,
      id_venta: "V123",
      servicio_fitology: "lipo laser",
    },
  ],
  Detalle_venta_accesorios: [
    {
      id: 1,
      id_venta: "V123",
      cantidad: "1",
      producto: "Avispa redumax",
      precio: "80.00",
    },
  ],
  Detalle_venta_suplementos: [
    {
      id: 1,
      id_venta: "V123",
      cantidad: "1",
      producto: "Proteina iso",
      precio: "160.00",
    },
  ],
  comentarios: [
    {
      id: 1,
      id_venta: "V123",
      id_comentario: "123",
      id_venta: "v123",
      desc_comentario: "El cliente pago todo",
    },
  ],
  Datos_pago: [
    {
      id: 1,
      id_venta: "V123",
      "forma de pago": "Tarjeta Automatica",
      banco: "BCP",
      Tarjeta: "American express",
      N_transac: "1234512345",
      monto_total: "2911.00",
      monto_parcial: "123",
    },
  ],
};

const testPago = {
  tarjeta: "",
};
