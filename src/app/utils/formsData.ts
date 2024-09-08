export interface IForms {
  code: string;
  empresa: 'Corficolombiaba' | 'Casa de bolsa' | '';
  forms: IForm[];
}
export interface IForm {
  id: string;
  tipo: string;
  data: any;
  fecha_create: string;
  estado: 'resuelto' | 'proceso';
}
export const formsData: IForms = {
  code: '',
  empresa: '',
  forms: [{
    id: '',
    tipo: '',
    data: '',
    fecha_create: '',
    estado: 'proceso'
  }],
};

export let UserData = {
  nombre: '',
  firma: '',

}
export const tiposDocumentos = [
  {
    code: ' CC',
    name: 'cédula de ciudadanía',
  },
  { code: 'CE', name: 'cédula de extranjería' },
  { code: 'TI', name: 'Tarjeta de identidad' },
  { code: 'RC', name: 'Registro civil' },
  { code: 'PB', name: 'Pasaporte' },
  { code: 'PA', name: 'Patrimonio autónomo' },
  { code: 'NIT', name: 'NIT' },
];
export const tiposDocumentos2 = [
  { code: 'NIT', name: 'NIT' },
  {
    code: ' CC',
    name: 'cédula de ciudadanía',
  },
  { code: 'CE', name: 'cédula de extranjería' },
  { code: 'TI', name: 'Tarjeta de identidad' },
  { code: 'RC', name: 'Registro civil' },
  { code: 'PB', name: 'Pasaporte' },
  { code: 'PA', name: 'Patrimonio autónomo' },
  { code: 'NR', name: 'No residente' },
  { code: 'PEP', name: 'Permiso especial de permanencia' },
];
