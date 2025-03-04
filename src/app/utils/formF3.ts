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

export const numeralesCambiariosF3Ingreso = [
  {
    codigo: '1063', texto: ' Pago de exportaciones de bienes en moneda legal colombiana (financiadas a más de doce (12) meses)',
  },
  {
    codigo: '1630', texto: 'Intereses y comisiones por créditos otorgados por residentes en el país a no residentes.',
  },
  {
    codigo: '1642', texto: 'Ejecución de avales y garantías en moneda extranjera otorgados por no residentes ',
  },
  {
    codigo: '1645', texto: 'Ingreso de divisas por ejecución de avales o garantías a favor del beneficiario residente',
  },
  {
    codigo: '4000', texto: 'Desembolso de créditos deuda privada- otorgados por IMC a residentes en el país.',
  },
  {
    codigo: '4005', texto: 'Desembolso de créditos - deuda privada- otorgados por no residentes a residentes',
  },
  {
    codigo: '4006', texto: 'Desembolso del endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda',
  },
  {
    codigo: '4020', texto: 'Amortización de créditos otorgados por residentes en el país a no residentes.',
  },
  {
    codigo: '4075', texto: 'Desembolso de créditos deuda pública- otorgados por no residentes al Gobierno Nacional a través de la DTN',
  },
  {
    codigo: '4080', texto: 'Desembolso de créditos deuda pública- otorgados por IMC a entidades del sector público.',
  },
  {
    codigo: '4085', texto: 'Desembolso de créditos deuda pública- otorgados por no residentes a entidades del sector público.',
  },
  {
    codigo: '4021', texto: 'Pagos de créditos externos activos desembolsados en moneda legal.',
  },
  {
    codigo: '4018', texto: 'Desembolso de créditos de prefinanciación de exportaciones.',
  },


]
export const numeralesCambiariosF3Egreso = [
  {
    codigo: '2063', texto: 'Pago de importaciones de bienes en moneda legal colombiana (financiadas a más de seis (6) meses).',
  },

  {
    codigo: '2125', texto: 'Intereses de créditos deuda privada- otorgados por IMC a residentes en el país.',
  }, {
    codigo: '2135', texto: 'Intereses de créditos deuda privada- otorgados por proveedores u otros no residentes a residentes.',
  },
  {
    codigo: '2155', texto: 'Intereses de créditos deuda pública- otorgados por proveedores u otros no residentes al Gobierno Nacional a través de la DTN.',
  },
  {
    codigo: '2165', texto: 'Intereses de créditos deuda pública- otorgados por IMC a entidades del sector público.',
  },
  {
    codigo: '2175', texto: 'Intereses de créditos deuda pública- otorgados por proveedores u otros no residentes a entidades del sector',
  },
  {
    codigo: '2185', texto: 'Intereses del endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda legal.',
  },
  {
    codigo: '2230', texto: 'Comisiones y otros gastos por créditos deuda privada- otorgados por IMC a residentes.',
  },
  {
    codigo: '2240', texto: 'Comisiones y otros gastos de créditos - deuda privada- otorgados por no residentes a residentes.',
  },
  {
    codigo: '2247', texto: 'Comisiones y otros gastos del endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda legal.',
  },
  {
    codigo: '2250', texto: 'Comisiones y otros gastos por créditos deuda pública- otorgados por IMC a entidades del sector público.',
  },
  {
    codigo: '2260', texto: 'Comisiones y otros gastos por créditos - deuda pública- otorgados por no residentes a entidades del sector público',
  },
  {
    codigo: '2612', texto: 'Restitución de avales y garantías en moneda extranjera emitidos por los intermediarios del mercado cambiario pagaderos en divisas, que respaldan la seriedad de la oferta y cumplimiento de empresas extranjeras y colombianas(Art. 59, numeral 1, literal e) inciso i de la R.E. 8/2000 J.D.) Aplica para avales ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '2613', texto: 'Restitución de avales y garantías en moneda extranjera emitidos por los intermediarios del mercado cambiario pagaderos en divisas, que respaldan el cumplimiento de obligaciones contraídas por residentes en el país derivadas de contratos de exportación de bienes o prestación de servicios no financieros en el exterior (Art. 59, numeral 1, literal e) inciso ii de la R.E. 8/2000 J.D.) - Aplica para avales ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '2614', texto: 'Restitución de avales y garantías en moneda extranjera emitidos por los intermediarios del mercado cambiario pagaderos en divisas, que respaldan obligaciones de no residentes(Art. 59, numeral 1, literal e) inciso iii de la R.E. 8/2000 J.D.) Aplica para avales ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '2615', texto: 'Restitución de avales y garantías en moneda extranjera emitidos por los intermediarios del mercado cambiario pagaderos en divisas, que respaldan obligaciones de no residentes correspondientes a la compra de petróleo crudo y gas natural de producción nacional a las empresas con capital del exterior que realicen actividades de exploración y explotación de petróleo y gas natural(Art. 59, numeral 1, literal e) inciso iv de la R.E. 8/2000 J.D.) Aplica para avales ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '2616', texto: 'Restitución de avales y garantías en moneda extranjera Aplica para avales informados y ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '2619', texto: 'Egreso de divisas por la ejecución de avales o garantías. ',
  },
  {
    codigo: '2620', texto: 'Intereses y comisiones por avales y garantías en moneda extranjera otorgados por no residentes Aplica para avales informados y ejecutados hasta el día 25 de mayo de 2018.',
  },
  {
    codigo: '4500', texto: 'Amortización de créditos deuda privada- otorgados por IMC a residentes en el país.',
  },
  {
    codigo: '4501', texto: 'Prepago de créditos deuda privada- otorgados por IMC a residentes.',
  },
  {
    codigo: '4505', texto: 'Amortización de créditos - deuda privada- otorgados por proveedores u otros no residentes a residentes.',
  },
  {
    codigo: '4506', texto: 'Prepago de créditos deuda privada- otorgados por proveedores u otros no residentes a residentes.',
  },
  {
    codigo: '4507', texto: 'Amortización del endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda legal.',
  },
  {
    codigo: '4508', texto: 'Prepago del endeudamiento externo otorgado a los IMC con destino a operaciones activas en moneda legal.',
  },
  {
    codigo: '4520', texto: 'Desembolso de créditos otorgados por residentes en el país a no residentes.',
  },
  {
    codigo: '4605', texto: 'Amortización de créditos deuda pública- otorgados por proveedores u otros no residentes al Gobierno Nacional a través de la DTN.',
  },
  {
    codigo: '4610', texto: 'Prepago de créditos deuda pública- otorgados por proveedores u otros no residentes al Gobierno Nacional a través de la DTN.',
  },
  {
    codigo: '4615', texto: 'Amortización de créditos - deuda pública- otorgados por IMC a entidades del sector público.',
  },
  {
    codigo: '4616', texto: 'Prepago de créditos deuda pública- otorgados por IMC a entidades del sector público.',
  },
  {
    codigo: '4625', texto: 'Amortización de créditos deuda pública- otorgados por proveedores u otros no residentes a entidades del sector público.',
  },

  {
    codigo: '4626', texto: 'Prepago de créditos - deuda pública- otorgados por proveedores u otros no residentes a entidades del sector público.',
  },
  {
    codigo: '4525', texto: 'Amortización de créditos de prefinanciación de exportaciones.',
  },


]
