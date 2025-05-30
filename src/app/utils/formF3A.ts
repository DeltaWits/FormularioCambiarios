export interface IFormF3A {
  steps: {
    step1: boolean,
    step2: boolean,
    step3: boolean,
  },
  tipo_de_operacion: {
    tipo: 'Inicial' | 'Corrección' | 'Cambio de formulario' | '',
    ingreso_o_egreso: 'Ingreso' | 'Egreso' | '',
    fecha_presentacion: string
  },
  identificacion_del_informe: {
    fecha_tramite: string,
    nit_imc: string,
    dv: string,
    numero_declaracion: string | number
  },


  descripcion_de_la_operacion: {
    numero_prestamo_aval: string,
    tipo_identificacion: string,
    numero_identificacion: string | number,
    dv: string | number,
    nombre_deudor: string,
    nombre_acreedor: string,
    codigo_moneda: string,
    valor_total_moneda: string | number,

    valor_total_dolares: string | number,
  },
  razon_por_no_desembolso_o_no_genero_declaracion: {
    Codigo_y_descripcion: string
  },

  informacion_de_numerales: [{
    numeral_cambiario: string,
    valor_total_moneda: string | number,
    valor_dolares: string | number,
  }],
}


export const razonNoGeneroDeselbolso = [
  "1: Amortización del crédito por anticipos de exportaciones con la realización de la exportación",
  "2: Amortización del crédito por prefinanciación de exportaciones con el producto de la exportación",
  "4: Deducción realizada por el acreedor al momento del desembolso del crédito por concepto de intereses, impuestos y / o servicios",
  "6: Crédito activo otorgado por un IMC desembolsado en divisas.",
  "7: Desembolso de préstamo para inversión colombiana directa o inversión financiera y en activos en el exterior.",
  "9: Punto 5.1.5, literal f de esta Circular.",
  "10: Créditos obtenidos para financiar el margen o garantía inicial o de mantenimiento exigido en bolsas de futuros y opciones del exterior.",
  "17: Préstamos indexados",
  "18: Capitalización de intereses",
  "21: Devolución giro financiado anticipado de importaciones de bienes o compra de bienes con destino a zona franca.",
  "22: Comisión por transferencia, aplica para endeudamiento externo pasivo y activo.",
  "23: Crédito pasivo obtenido por un IMC en desarrollo de los actos conexos o complementarios desembolsado en divisas.",
  "24: Ejecución de avales y garantías a favor del IMC.Aplica únicamente para",
  "informes de avales y garantías(Formulario 8) presentados con anterioridad al 25 de mayo de 2018.",
  "25: Desembolso de crédito para la constitución del depósito",
  "26: Desembolso de crédito para pagos anticipados de importaciones de bienes o compra de bienes con destino a zona franca.",
  "29: Cancelación del informe del crédito externo de capital de trabajo por la imposibilidad de pago – persona jurídica.",
  "30: Desembolso de créditos obtenidos para pagar créditos de importaciones.",
  "31: Cancelación del informe del crédito externo de capital de trabajo por la imposibilidad de pago – persona natural.",
  "32: Cancelación del informe del crédito externo de financiación de comercio exterior por la imposibilidad de pago.",
  "33: Dación en pago de crédito de capital de trabajo – persona jurídica",
  "34: Dación en pago de crédito de capital de trabajo – persona natural",
  "35: Dación en pago de crédito de financiación de comercio exterior",
  "36: Endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda legal.",
  "38: Caución como fuente de pago del endeudamiento externo activo informado por concepto de financiación de exportaciones de bienes. (Aplicable únicamente a informes de deuda externa activa efectuados con el propósito 33: “Exportaciones – Activo”.)",
  "39: Pago de deuda interna por compra de deuda externa informada(Artículo 60 de la R.E. 1 / 18 J.D.) ",
  "40: Cancelación del informe de endeudamiento externo derivado de la conversión a deuda interna por pérdida de la condición de no residente del deudor o acreedor.",
  "41: Pago derivado de la ejecución o restitución de avales o garantías."
]
