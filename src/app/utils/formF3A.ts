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
