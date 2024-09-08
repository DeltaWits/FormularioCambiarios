export interface IFormF1 {
  steps: {
    step1: boolean,
    step2: boolean,
    step3: boolean,
  },
  tipo_de_operacion: string,
  // tipo_de_moneda_operacion: string,
  identificacion_de_la_operacion: {
    fecha_tramite: string,
    nit_imc: string,
    dv: string,
    numero_declaracion: string
  },
  identificacion_operacion_anterior: {
    fecha_operacion: string,
    nit_imc: string,
    dv: string,
    numero_deuda_externa: string,
    numero_declaracion_cambio: string
  },
  declaracion_detalle: {
    devolucion: boolean,
    informacion_consolidada: boolean,
  },
  tipo_identidad: {
    otros: string,
    tipo: string
  },
  identificacion_de_importador: {
    tipo_documento: string,
    numero_documento: string,
    dv: string,
    nombre_razon_social: string
  },
  descripcion_de_la_operacion: [{
    numero_cambiario: string,
    cod_mda_negociacion: string,
    vr_total_mda_negociacion: string,
    tasa_de_cambio: string,
    valor_total_dolares: string,
  }],
  informacion_DIAN: [{
    numero_o_factura: string,
    valor_FOB: string
  }]

}

export const numeralesCambiariosF1 = [
  {
    codigo: '2015', texto: 'Giro por importaciones de bienes ya embarcados y por importaciones de bienes pagados con tarjeta de crédito emitida en el exterior, o en Colombia cobrada en divisas.'
  },
  {
    codigo: '2016', texto: 'Gastos de importación de bienes incluidos en la factura de los proveedores de los bienes y/o contrato de compraventa de bienes.Gastos de exportación.'
  },
  {
    codigo: '2017', texto: 'Pago anticipado de futuras importaciones de bienes, efectuado con recursos propios de los importadores residentes en Colombia o compra de mercancías por usuarios de zona franca'
  },
  {
    codigo: '2022', texto: 'Giro por importaciones de bienes ya embarcados en un plazo superior a un (1) mes e inferior o igual a doce (12) meses, financiadas por entidades financieras del exterior o proveedores, o pagadas con tarjeta de crédito emitida en el exterior cobrada en divisas.'
  },
  {
    codigo: '2023', texto: 'Giro por importaciones de bienes ya embarcados en un plazo superior a un (1) mes e inferior o igual a doce (12) meses, financiadas por Intermediarios del Mercado Cambiario, o pagadas con tarjeta de crédito emitida en Colombia cobrada en divisas.'
  },
  {
    codigo: '2024', texto: 'Giro por importaciones de bienes ya embarcados en un plazo superior a los doce (12) meses, financiadas por entidades financieras del exterior o proveedores, o pagadas con tarjeta de crédito emitida en el exterior cobrada en divisas.'
  },
  {
    codigo: '2025', texto: 'Giro por importaciones de bienes ya embarcados en un plazo superior a los doce (12) meses, financiadas por Intermediarios del Mercado Cambiario, o pagadas con tarjeta de crédito emitida en Colombia cobrada en divisas.'
  },

]
