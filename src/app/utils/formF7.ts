export interface IFormF7 {
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
    codigo_ciudad: string,
    direccion: string,
    telefono: '',
    correo: string,
    codigo_CIIU: string,
  },
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
    numero_de_creaditos_sustituir: string
    codigo_moneda: string
  },
  datos_del_deudor: {
    naturaleza: string,
    tipo_empresa: string,
    es_vigilado_superintendencia: 'SI' | 'NO' | '',
    cual_superintendencia: string,
    sector: string
  },


}
export const codigoPropositoPrestamo = [
  { id: 43, descripcion: 'Anticipos para futuras capitalizaciones' },
  { id: 35, descripcion: 'Capital de trabajo' },
  { id: 47, descripcion: 'Crédito externo activo derivado de la ejecución de avales o garantías' },
  { id: 33, descripcion: 'Exportaciones' },
  { id: 36, descripcion: 'Exportaciones - Venta de instrumentos de pago' },
  { id: 37, descripcion: 'Proceso de reorganización empresarial internacional, o actos o negocios jurídicos' },
  
]

export const tasasInteres = [
  { id: 1, descripcion: 'PRIME RATE' },
  { id: 2, descripcion: 'LIBOR 1 MES' },
  { id: 4, descripcion: 'Otra' },
  { id: 5, descripcion: 'Sin interés' },
  { id: 8, descripcion: 'LIBOR 2 MESES' },
  { id: 9, descripcion: 'LIBOR 3 MESES' },
  { id: 10, descripcion: 'LIBOR 6 MESES' },
  { id: 11, descripcion: 'LIBOR 12 MESES' },
  { id: 3, descripcion: 'Fija' },
  { id: 12, descripcion: 'DTF - estipulada en moneda legal' },
  { id: 13, descripcion: 'UVR - estipulada en moneda legal' },
  { id: 14, descripcion: 'IPC - estipulada en moneda legal' },
  { id: 15, descripcion: 'IBR - estipulada en moneda legal' },
  { id: 15, descripcion: 'SOFR' },
  { id: 16, descripcion: 'ESTR' }
];

export const tipoPresarioDeudor = [
  { id: 2, descripcion: 'Filial o sucursal de banco colombiano' },
  { id: 19, descripcion: 'No residentes personas jurídicas o asimiladas' },
  { id: 20, descripcion: 'Otros no residentes personas naturales' },
]

export const numeralesCambiariosF7 = []
