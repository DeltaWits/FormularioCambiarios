export interface IFormF3 {
  identificacion_de_exportador: any
  steps: {
    step1: boolean,
    step2: boolean,
    step3: boolean,
  },
  tipo_de_operacion: {
    tipo: 'Inicial' | 'Corrección' | 'Cambio de formulario' | '',
    ingreso_o_egreso: 'Ingreso' | 'Egreso' | '',
    devolucion: 'SI' | 'NO' | ''
  },
  identificacion_de_la_declaracion: {
    fecha_tramite: string,
    nit_imc: string,
    dv: string,
    numero_declaracion: string | number
  },
  identificacion_operacion_anterior: {
    fecha_operacion: string,
    nit_imc: string,
    dv: string,
    numero_deuda_externa: string | number,
    numero_declaracion_cambio: string | number
  },
  detalle_del_credito: {
    numero_prestamo: string,
    tipo_identificacion: string,
    numero_identificacion: string | number,
    dv: string | number,
    nombre_deudor: string,
    nombre_acreedor: string,

  },
  detalle_de_la_declaracion: {
    codigo_moneda: string,
    valor_total_moneda: string,
    tasa_de_cambio_dolar: string,
    valor_total_dolares: string | number,
    tasa_cambio_moneda_negociacion: string,

    valor_moneda_stipulada: string,
  }
  informacion_de_numerales: [{
    numeral_cambiario: string,
    valor_total_moneda: string,
    valor_dolares: string,
    valor_moneda_estipulada: string,
  }],
}

export const numeralesCambiariosF3 = [
  {
    codigo: '1630', texto: '',
  },
  {
    codigo: '1642', texto: '',
  },
  {
    codigo: '1645', texto: '',
  },
  {
    codigo: '4000', texto: '',
  },
  {
    codigo: '4005', texto: '',
  },
  {
    codigo: '4006', texto: '',
  },
  {
    codigo: '4020', texto: '',
  },
  {
    codigo: '4075', texto: '',
  },
  {
    codigo: '4080', texto: '',
  },
  {
    codigo: '4085', texto: '',
  },
  {
    codigo: '4021', texto: '',
  },
  {
    codigo: '4018', texto: '',
  },
  {
    codigo: '2063', texto: '',
  },

  {
    codigo: '2125', texto: '',
  }, {
    codigo: '2135', texto: '',
  },
  {
    codigo: '2155', texto: '',
  },
  {
    codigo: '2165', texto: '',
  },
  {
    codigo: '2175', texto: '',
  },
  {
    codigo: '2185', texto: '',
  },
  {
    codigo: '2230', texto: '',
  },
  {
    codigo: '2240', texto: '',
  },
  {
    codigo: '2247', texto: '',
  },
  {
    codigo: '2250', texto: '',
  },
  {
    codigo: '2260', texto: '',
  },
  {
    codigo: '2612', texto: '',
  },

]
