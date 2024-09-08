export interface IFormF5 {
  steps: {
    step1: boolean,
    step2: boolean,
    step3: boolean,
  },
  tipo_de_operacion: {
    tipo: 'Inicial' | 'Corrección' | 'Cambio de formulario' | '',
    ingreso_o_egreso: 'Ingreso' | 'Egreso' | '',
  },
  identificacion_de_la_declaracion: {
    fecha_tramine: string,
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
  declaracion_detalle: {
    devolucion: boolean,
    informacion_consolidada: boolean,
  },
  tipo_identidad: {
    otros: string,
    tipo: string
  },
  identificacion_de_la_empresa: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    dv: string,
    nombre: string,
    telefono: string,
    direccion: string,
    ciudad: string
  },
  descripcion_de_la_operacion: {
    cod_mda_negociacion: string,
    vr_total_mda_negociacion: string,
    tasa_de_cambio_dolar: string,
    valor_total_dolares: number,
  },
  informacion_de_la_operacion: [{
    numero_cambiario: string,
    valor_total_dolares: string,
  }],
  observaciones: string
}

export const numeralesCambiariosF5 = []
