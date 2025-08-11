// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { SharedModule } from 'src/app/shared.module';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { textTipoOperacion } from '../../../f1/textosF1';
import { IFormF6, tipoPresarioDeudor } from 'src/app/utils/formF6';
import { FormService } from 'src/app/services/form.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-f6step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],
  templateUrl: './f6step1.component.html',
  styleUrl: './f6step1.component.scss'
})
export class F6step1Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF6: IFormF6 = {
    tipo_de_solicictud: {
      tipo: '',
      fecha_solicitud: '',
      numero_de_credito: ''
    },
    informacion_del_residente_deudor: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre_razon_social: '',
      codigo_cuidad: '',
      direccion: '',
      telefono: '',
      correo: '',
      codigo_CIIU: '',
    },
    informacion_del_acreedor: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre_razon_social: '',
      pais: '',
      tipo_presario_deudor: '',
      correo: '',
      codigo_CIIU: '',
    },
    descripcion_del_prestamo: {
      codigo_proposito_prestamo: '',
      codigo_moneda: '',
      valor_moneda_estipulada: '',
      tasa_interes: '',
      spread_valor: '',
      plazo: '',
      tiempo: '',
      numero_deposito_dinanciacion: ''
    },

  }
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  textTipoOperacion = textTipoOperacion

  tipoPresarioDeudor = tipoPresarioDeudor;
  ShowPopUp = false;

  paises: { Nombre: string | any; Codigo: string }[] = [];
  ciudades: { Nombre: string | any; codigo: string }[] = [];
  ciiu: any;
  selectDocPN = tiposDocumentos
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo', 
    tipe: 'simple',
  };
  switchState: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    console.log("monedas", this.monedas)
    if(!this.selectDocPN.find((item: any) => item.code == 'NR')){
      this.selectDocPN.push({
        name: 'No Residente',
        code: 'NR'
      })
    }
    
    this.getPaises()
    this.loadExcelFromCiiu()
    this.getCiudades()
  }
  onSwitchChange(num: number) {
    if (num == 1) {
    }
    console.log('Switch State:', this.switchState);
    this.switchState = !this.switchState
  }// @ts-nocheck
  // checkDv1(inputNum: number) {
  //   if (

  //     inputNum == 1
  //   ) {



  //     this.formF6.identificacion_de_la_declaracion.dv = this.calculateDV(

  //       this.formF6.identificacion_de_la_declaracion.nit_imc
  //     );
  //   } else if (

  //     inputNum == 2
  //   ) {
  //     this.formF6.identificacion_operacion_anterior.dv = this.calculateDV(

  //       this.formF6.identificacion_operacion_anterior.nit_imc
  //     );
  //   }
  // }
  calculateDV(numNit: any) {
    var vpri, x, y, z;
    let stringNit = numNit.toString();
    // Se limpia el Nit
    // numNit = numNit.replace(/\s/g, ''); // Espacios
    // numNit = numNit.replace(/,/g, ''); // Comas
    // numNit = numNit.replace(/\./g, ''); // Puntos
    // numNit = numNit.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(numNit)) {
      alert("El nit/cédula '" + numNit + "' no es válido(a).");
      return '';
    }

    // Procedimiento
    vpri = new Array(16);
    z = stringNit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (var i = 0; i < z; i++) {
      y = stringNit.substr(i, 1);
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;

      x += y * vpri[z - i];
      // console.log ( x ) ;
    }

    y = x % 11;
    console.log(y);

    return (y > 1 ? 11 - y : y).toString();
  }
  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {
      this.submitInvalid = false;
      this.formF6.steps.step1 = true
      this.formService.saveFormDataFId(this.formF6, this.formId);
      this.step.emit('2');
    } else {
      console.log("entro", step1Form.valid)
      this.submitInvalid = true;

      this.MessaggePopUp.titulo = 'Alerta';
      this.MessaggePopUp.descripcion =
        'Hay campos sin diligenciar, verificar para continuar. *Los campos faltantes se muestran en rojo.';
      this.MessaggePopUp.tipe = 'alert';

      this.showActivePopUp(true);
      // @ts-ignore: Desactivar comprobaciones de TypeScript para esta sección
    }
  }
  showActivePopUp(status: boolean) {
    this.ShowPopUp = status;
  }
  async getPaises() {
    // this.paises = Object.keys(countries).map((code) => {
    //   return {
    //     name: (countries as { [code: string]: Country })[code].name,
    //     code: code,
    //   };
    // });
    const fileUrl = './assets/paises.xlsx';
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        if (arrayBuffer) {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.paises = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
          });
          console.log(this.paises)
          // Los datos del archivo Excel están disponibles en this.excelData
        } else {
          console.error('No se pudo cargar el archivo Excel.');
        }
      })
      .catch((error) => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }
  async loadExcelFromCiiu() {
    const fileUrl = './assets/ciiu.xlsx';
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        if (arrayBuffer) {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.ciiu = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          // Los datos del archivo Excel están disponibles en this.excelData
        } else {
          console.error('No se pudo cargar el archivo Excel.');
        }
      })
      .catch((error) => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }
  async getCiudades() {
    const fileUrl = './assets/ciudades.xlsx';
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        if (arrayBuffer) {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.ciudades = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
          });
          // Los datos del archivo Excel están disponibles en this.excelData
        } else {
          console.error('No se pudo cargar el archivo Excel.');
        }
      })
      .catch((error) => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }
}

