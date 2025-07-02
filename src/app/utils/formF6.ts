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
    numero_de_creaditos_sustituir: string,
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

export const numeralesCambiariosF6 = []


export const codigoPropositoPrestamo = [
  { id: 42, descripcion: 'Acto o negocio jurídico diferente de reorganizaciones empresariales internacionales' },
  { id: 18, descripcion: 'Anticipo de exportaciones bienes de capital' },
  { id: 8, descripcion: 'Anticipo de exportaciones de bienes de utilización inmediata e intermedios' },
  { id: 43, descripcion: 'Anticipos para futuras capitalizaciones' },
  { id: 57, descripcion: 'Capital de trabajo otorgado por no residentes estipulado en moneda extranjera y desembolsado en moneda legal' },
  { id: 5, descripcion: 'Capital de trabajo otorgado por no residentes o IMC desembolsado en moneda extranjera, y capital de trabajo otorgado por IMC estipulado en divisas y desembolsado en moneda legal' },
  { id: 45, descripcion: 'Crédito externo pasivo derivado de la ejecución de avales o garantías' },
  { id: 52, descripcion: 'Créditos concesionales con componente de ayuda otorgados por gobiernos extranjeros' },
  { id: 7, descripcion: 'Emisión y colocación de títulos en mercados internacionales por parte de residentes' },
  { id: 12, descripcion: 'Financiación de bienes de capital' },
  { id: 11, descripcion: 'Financiación de bienes de utilización inmediata e intermedios' },
  { id: 16, descripcion: 'Financiación de compra de bienes de capital - Zona Franca' },
  { id: 17, descripcion: 'Financiación de compra de bienes de utilización inmediata - Zona Franca' },
  { id: 38, descripcion: 'Financiación estipulada en moneda extranjera y desembolsada en moneda legal obtenida por los IMC para destinarla a operaciones activas en moneda legal' },
  { id: 56, descripcion: 'Financiación estipulada en moneda legal y desembolsada en moneda extranjera obtenida por IMC mediante colocación de títulos en los mercados internacionales de capitales, para destinarla a operaciones activas en moneda legal' },
  { id: 55, descripcion: 'Financiación estipulada en moneda legal y desembolsada en moneda extranjera obtenida por IMC para destinarla a operaciones activas en moneda legal' },
  { id: 54, descripcion: 'Financiación estipulada y desembolsada en moneda extranjera obtenida por IMC mediante colocación de títulos en mercados internacionales de capitales, para destinarla a operaciones activas en moneda legal' },
  { id: 53, descripcion: 'Financiación estipulada y desembolsada en moneda extranjera obtenida por los IMC para destinarla a operaciones activas en moneda legal' },
  { id: 40, descripcion: 'Financiación estipulada y desembolsada en moneda legal obtenida por los IMC, para destinarla a operaciones activas en moneda legal' },
  { id: 4, descripcion: 'Inversión colombiana directa en el exterior' },
  { id: 20, descripcion: 'Inversión financiera y en activos en el exterior' },
  { id: 2, descripcion: 'Leasing o arrendamiento financiero contratado con no residentes' },
  { id: 10, descripcion: 'Operación de derivados artículo 49 Resolución Externa 1 de 2018' },
  { id: 49, descripcion: 'Operaciones de leasing o arrendamiento financiero de importación otorgado por IMC a residentes en moneda extranjera' },
  { id: 50, descripcion: 'Prefinanciación de exportaciones otorgado por IMC o no residentes estipulado y desembolsado en moneda extranjera' },
  { id: 58, descripcion: 'Prefinanciación de exportaciones otorgado por no residentes desembolsado en moneda legal' },
  { id: 22, descripcion: 'Procesos de reorganización empresarial internacionales' },
  { id: 51, descripcion: 'Giros financiados anticipados' }
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
  { id: 1, descripcion: 'IMC' },
  { id: 2, descripcion: 'Filial o sucursal de banco colombiano' },
  { id: 3, descripcion: 'Entidad financiera extranjera' },
  { id: 5, descripcion: 'Sociedad Extranjera (Casa matriz u otras filiales con las que su empresa tiene vínculo accionario)' },
  { id: 18, descripcion: 'Artículo 60, numeral 2 de la Resolución Externa 1 de 2018' },
  { id: 19, descripcion: 'No residentes personas jurídicas o asimiladas' },
  { id: 20, descripcion: 'Otros no residentes personas naturales' },
]
