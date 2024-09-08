export interface IFormF6 {
  steps: {
    step1: boolean,
    step2: boolean,
    step3: boolean,
  },
  tipo_de_solicictud: {
    tipo: 'Inicial' | 'Modificación' | '',
    fecha_solicitud: string,
    numero_de_credito: string | number
  },
  informacion_del_residente_deudor: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    nombre_razon_social: string,
    codigo_cuidad: string,
    direccion: string,
    telefono: string,
    correo: string,
    codigo_CIIU: string,
  }
  informacion_del_acreedor: {
    tipo_identificacion: string,
    numero_identifiacion: string | number,
    nombre_razon_social: string,
    pais: string,
    tipo_presario_deudor: string
    correo: string,
    codigo_CIIU: string,
  },
  descripcion_del_prestamo: {
    codigo_proposito_prestamo: string | number,
    codigo_moneda: string,
    valor_moneda_estipulada: string | number,
    tasa_interes: string,
    spread_valor: string,
    plazo: string | number,
    tiempo: 'Días' | 'Meses' | 'Años' | '',
    numero_deposito_dinanciacion: string | number
  },
  plan_de_armonizacion: [{
    fecha: string,
    valor_cuota: string | number,

  }],
  informacion_transmision_procedimientos_credito: {
    tipo_transmision: string,
    numero_de_creaditos_sustituir: []
  },
  datos_del_deudor: {
    naturaleza: string,
    tipo_empresa: string,
    es_vigilado_superintendencia: 'SI' | 'NO' | '',
    cual_superintendencia: string,
    sector: string
  },

}

export const numeralesCambiariosF6 = []
