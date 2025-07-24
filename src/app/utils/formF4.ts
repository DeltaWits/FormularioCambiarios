
export interface IFormF4 {
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
  destino_inversion: string,
  destino_inversion_code:string,
  Identificacion_de_la_empresa_reseptora: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    dv: string | number,
    nombre: string,
    pais: string,
    correo: string,
    codigo_CIIU: string,
    telefono: string,
    direccion: string,
  }
  informacion_administrador_del_encargo: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    dv: string | number,
    nombre: string,

  },
  identificacion_del_inversionista: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    nombre: string,
    pais: string,
    correo: string,
    codigo_CIIU: string,
    telefono: string,
    direccion: string,
  },
  descripcionde_la_operacion: {
    numeral_cambiario: string
    codigo_moneda: string,
    valor_moneda_negociacion: string,
    numero_prestamo_aval: string,
    tasa_cambio_dolar: string
    valor_total_dolares: string | number,
    moneda_registro: string,
    tasa_cambio_pesos: string,
    valor_total_pesos: string,
    participaciones: string,
    motivo_sin_participaciones: string

  }
  informacion_residente: {
    numeral_cambiario: string,
    naturaleza: string,
    tipo_empresa: string,
    es_vigilado_superintendencia: 'SI' | 'NO' | '',
    cual_superintendencia: string,
    sector: string,

  }
  observaciones: string
}

export const numeralesCambiariosF4Ingreso = [
  {
    codigo: '1310', texto: 'Inversión suplementaria al capital asignado exploración y explotación de petróleo. ',
  }, {
    codigo: '1320', texto: 'Inversión suplementaria al capital asignado servicios inherentes al sector de hidrocarburos.',

  }, {
    codigo: '1390', texto: 'Inversión suplementaria al capital asignado gas natural, carbón, ferroníquel y uranio. ',

  }, {
    codigo: '1590', texto: 'Rendimientos o dividendos de inversión colombiana directa en el exterior. ',
  }, {
    codigo: '1595', texto: 'Rendimientos o dividendos de inversión financiera en activos financieros en el exterior.',
  }, {
    codigo: '1598', texto: 'Rendimientos de la inversión financiera en activos fijos en el exterior.',
  }, {
    codigo: '1599', texto: 'Rendimientos de la inversión financiera especial.',
  }, {
    codigo: '4025', texto: 'Inversión directa de capitales del exterior al capital asignado de sucursales régimen especial sector hidrocarburos y minería.',
  }, {
    codigo: '4026', texto: 'Inversión directa de capitales del exterior en sociedades nacionales y con capital del exterior que realicen actividades del sector de hidrocarburos y minería.',
  }, {
    codigo: '4030', texto: 'Inversión de portafolio de capitales del exterior ',
  }, {
    codigo: '4031', texto: 'Inversión de portafolio de capitales del exterior - Programas sobre certificados de depósitos negociables representativos de valores. ',
  }, {
    codigo: '4032', texto: ' Adquisición de participaciones en fondos de capital privado. ',
  }, {
    codigo: '4035', texto: 'Inversión directa de capitales del exterior en empresas y en el capital asignado de sucursales sectores diferentes de hidrocarburos y minería ',
  }, {
    codigo: '4036', texto: 'Prima en colocación de aportes.',
  }, {
    codigo: '4038', texto: 'Inversión de portafolio de capital del exterior en valores emitidos por entidades extranjeras e inscritos en el RNVE Decreto 4804 del 29 de diciembre de 2010. ',
  }, {
    codigo: '4040', texto: ' Inversión suplementaria al capital asignado sectores diferentes de hidrocarburos y minería.',
  }, {
    codigo: '4055', texto: 'Retorno de la inversión colombiana directa en el exterior. ',
  }, {
    codigo: '4058', texto: 'Redención o liquidación de la inversión financiera en activos financieros en el exterior. ',
  }, {
    codigo: '4065', texto: 'Redención o liquidación de la inversión financiera en activos fijos radicados en el exterior. ',
  }, {
    codigo: '4066', texto: 'Redención o liquidación de la inversión financiera especial.',
  }

]
export const numeralesCambiariosF4Egreso = [
  {
    codigo: '2074', texto: 'Utilidades, rendimientos y dividendos de la inversión directa de capitales del exterior ',
  },
  {
    codigo: '4560', texto: 'Giro al exterior de la inversión directa y suplementaria al capital asignado de capitales del exterior. ',
  },
  {
    codigo: '4563', texto: 'Retorno de inversión de capital del exterior por la liquidación de participaciones en fondos de capital privado. ',
  },
  {
    codigo: '4565', texto: 'Inversión de capitales del exterior no perfeccionada. ',
  },
  {
    codigo: '4635', texto: 'Retorno de excedentes en inversión de capitales del exterior.',
  },
  {
    codigo: '4580', texto: 'Inversión colombiana directa en el exterior.',
  },
  {
    codigo: '4581', texto: 'Inversión Colombiana en empresas en el exterior pagada con tarjeta de crédito emitida en Colombia y cobrada en moneda legal ',
  },
  {
    codigo: '4582', texto: 'Inversión Colombiana en empresas en el exterior pagada con tarjeta de crédito emitida en el exterior o en Colombia y cobrada en divisas. ',
  },
  {
    codigo: '4585', texto: 'Inversión financiera en activos financieros en el exterior. ',
  },
  {
    codigo: '4590', texto: 'Inversión financiera por compra de obligaciones en el exterior (Art. 60 de la R.E. 1/18 J.D.). ',
  },
  {
    codigo: '4570', texto: 'Inversión financiera especial.',
  },
  {
    codigo: '4573', texto: 'Inversión financiera en activos fijos radicados en el exterior',
  },
  {
    codigo: '4571', texto: 'Retorno, utilidades, rendimientos y dividendos de la inversión de capital del exterior de portafolio',
  },
  {
    codigo: '', texto: '',
  },
]
