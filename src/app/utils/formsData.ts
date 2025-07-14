export interface IForms {
  code: string;
  empresa: 'corficolombiana' | 'casa de bolsa' | '';
  forms: IForm[];
}
export interface IForm {
  id: string;
  tipo: string;
  data: any;
  empresa?: 'corficolombiana' | 'casa de bolsa' | '';
  fecha_create: string;
  estado: 'resuelto' | 'proceso';
}
export const formsData: IForms = {
  code: '',
  empresa: '',
  forms: [{
    id: '',
    tipo: '',
    empresa: '',
    data: {},
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
    code: 'CC',
    name: 'Cédula de ciudadanía',
  },
  { code: 'CE', name: 'Cédula de extranjería' },
  { code: 'TI', name: 'Tarjeta de identidad' },
  { code: 'RC', name: 'Registro civil' },
  { code: 'PB', name: 'Pasaporte' },
  { code: 'PA', name: 'Patrimonio autónomo' },
  { code: 'NIT', name: 'NIT' },
];
export const tiposDocumentos2 = [
  { code: 'NIT', name: 'NIT' },
  {
    code: 'CC',
    name: 'Cédula de ciudadanía',
  },
  { code: 'CE', name: 'Cédula de extranjería' },
  { code: 'TI', name: 'Tarjeta de identidad' },
  { code: 'RC', name: 'Registro civil' },
  { code: 'PB', name: 'Pasaporte' },
  { code: 'PA', name: 'Patrimonio autónomo' },
  { code: 'NR', name: 'No residente' },
  { code: 'PEP', name: 'Permiso especial de permanencia' },
];
