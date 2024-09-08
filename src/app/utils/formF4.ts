
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
  Identificacion_de_la_empresa_reseptora: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
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
    participantes: string,
    motivo_sin_participantes: string

  }
  informacion_residente: {
    numeral_cambiario: string,
    naturaleza: string,
    tipo_empresa: string,
    es_vigilado_superintendencia: 'SI' | 'NO' | '',
    cual_superintendencia: string,
    sector: string,

  }
}

export const numeralesCambiariosF4 = []
