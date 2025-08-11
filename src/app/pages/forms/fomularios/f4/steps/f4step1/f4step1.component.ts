// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { IFormF4 } from 'src/app/utils/formF4';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { textTipoOperacion } from '../../textosF4';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-f4step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, SharedModule, PopUpAlertComponent, NgIf, NgFor],
  templateUrl: './f4step1.component.html',
  styleUrl: './f4step1.component.scss'
})
export class F4step1Component implements AfterViewInit {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF4: IFormF4 = {
    tipo_de_operacion: {
      tipo: '',
      ingreso_o_egreso: '',
      devolucion: ''
    },
    identificacion_de_la_declaracion: {
      fecha_tramite: '',
      nit_imc: '',
      dv: '',
      numero_declaracion: ''
    }, identificacion_operacion_anterior: {
      fecha_operacion: '',
      nit_imc: '',
      dv: '',
      numero_deuda_externa: '',
      numero_declaracion_cambio: ''
    },
    destino_inversion: '',
    destino_inversion_code: '',
    Identificacion_de_la_empresa_reseptora: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      dv: '',
      nombre: '',
      pais: '',
      correo: '',
      codigo_CIIU: '',
      telefono: '',
      direccion: '',
    },
    informacion_administrador_del_encargo: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      dv: '',
      nombre: '',

    },
    identificacion_del_inversionista: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre: '',
      pais: '',
      correo: '',
      codigo_CIIU: '',
      telefono: '',
      direccion: '',
    },

  }

  paises: { Nombre: string | any; Codigo: string }[] = [];

  ciiu: any;
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  textTipoOperacion = textTipoOperacion

  ShowPopUp = false;

  selectDocPN = tiposDocumentos;
  selectDocR = tiposDocumentos;
  selectDocI = tiposDocumentos;
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
    this.getPaises()
    this.loadExcelFromCiiu()
  }
  ngAfterViewInit(): void {
    console.log("monedas", this.monedas)
  }
  chagenIDOptions(num: number) {
    if (num == 1) {
      this.selectDocR = [{
        code: 'NIT',
        name: 'Nit',
      },
      {
        code: 'REC',
        name: 'Receptor en constitución',
      },
      {
        code: 'PA',
        name: 'Patrimonio autónomo',
      },
      {
        code: 'NR',
        name: 'No residente',
      }]

    } else if (num == 2) {
      this.selectDocR = [{
        code: 'NIT',
        name: 'NIT',
      },
      {
        code: 'REC',
        name: 'Receptor en constitución',
      },

      {
        code: 'NR',
        name: 'No residente',
      }]

    } else if (num == 3) {
      this.selectDocR = [{
        code: 'NIT',
        name: 'NIT',
      }]

    }
    else if (num == 4) {
      this.selectDocR = [{
        code: 'NIT',
        name: 'NIT',
      }, {
        code: 'REC',
        name: 'Receptor en constitución',
      }, {
        code: 'PA',
        name: 'Patrimonio autónomo',
      }]
    }
    else {
      this.selectDocR = [{
        code: '',
        name: '',
      }]
    }

  }
  onSwitchChange(num: number) {
    if (num == 1) {
    }
    this.switchState = !this.switchState
  }// @ts-nocheck
  checkDv1(inputNum: number) {
    if (

      inputNum == 1
    ) {



      this.formF4.identificacion_de_la_declaracion.dv = this.calculateDV(

        this.formF4.identificacion_de_la_declaracion.nit_imc
      );
    } else if (

      inputNum == 2
    ) {
      this.formF4.identificacion_operacion_anterior.dv = this.calculateDV(

        this.formF4.identificacion_operacion_anterior.nit_imc
      );
    }
    else if (

      inputNum == 3
    ) {
      this.formF4.Identificacion_de_la_empresa_reseptora.dv = this.calculateDV(

        this.formF4.Identificacion_de_la_empresa_reseptora.numero_identifiacion
      );
    }
    else if (

      inputNum == 4
    ) {
      this.formF4.informacion_administrador_del_encargo.dv = this.calculateDV(

        this.formF4.informacion_administrador_del_encargo.numero_identifiacion
      );
    }
  }
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
      this.formF4.steps.step1 = true
      this.formService.saveFormDataFId(this.formF4, this.formId);
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

  getPaises() {
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
          // Los datos del archivo Excel están disponibles en this.excelData
        } else {
          console.error('No se pudo cargar el archivo Excel.');
        }
      })
      .catch((error) => {
        console.error('Error al cargar el archivo Excel:', error);
      });
  }

  loadExcelFromCiiu() {
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
}
