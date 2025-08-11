// @ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IFormF5 } from 'src/app/utils/formF5';
import { tiposDocumentos, tiposDocumentos2 } from 'src/app/utils/formsData';
import { textTipoOperacion } from '../../textosF5';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { NgFor, NgIf } from '@angular/common';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { SharedModule } from 'src/app/shared.module';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-f5step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent, SharedModule],

  templateUrl: './f5step1.component.html',
  styleUrl: './f5step1.component.scss'
})
export class F5step1Component implements OnInit {
  @Input() monedas: any = [];
  selectDocPN = tiposDocumentos2;
  @Input() formId = ''

  textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  
  ciudades: { Nombre: string | any; codigo: string }[] = [];
  submitInvalid = false
  @Input() formF5: IFormF5 = {
    tipo_de_operacion: {
      tipo: '',
      ingreso_o_egreso: '',
    },
    // tipo_de_moneda_operacion: '',
    identificacion_de_la_declaracion: {

      fecha_tramine: '',
      nit_imc: '',
      dv: '',
      numero_declaracion: ''
    },
    identificacion_operacion_anterior: {
      fecha_operacion: '',
      nit_imc: '',
      dv: '',
      numero_deuda_externa: '',
      numero_declaracion_cambio: ''
    },
    declaracion_detalle: {
      devolucion: false,
      informacion_consolidada: false,
    },
    tipo_identidad: {
      otros: '',
      tipo: ''
    }, identificacion_de_la_empresa: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      dv: '',
      nombre: '',
      telefono: '',
      direccion: '',
      ciudad: ''
    },
  }
  ShowPopUp = false;
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
  ) { }
  ngOnInit(): void {
    this.getCiudades()
    // console.log("monedas", this.monedas)
  }
  onSwitchChange(num: number) {
    if (num == 1) {
    }
    console.log('Switch State:', this.switchState);
    this.switchState = !this.switchState
  }
  checkDv1(inputNum: number) {
    if (

      inputNum == 1
    ) {
      this.formF5.identificacion_de_la_declaracion.dv = this.calculateDV(
        this.formF5.identificacion_de_la_declaracion.nit_imc
      );
    } else if (
      inputNum == 2
    ) {
      this.formF5.identificacion_operacion_anterior.dv = this.calculateDV(
        this.formF5.identificacion_operacion_anterior.nit_imc
      );
    } else if (
      inputNum == 3
    ) {
      this.formF5.identificacion_de_la_empresa.dv = this.calculateDV(
        this.formF5.identificacion_de_la_empresa.numero_identifiacion
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
    // console.log(y);

    return (y > 1 ? 11 - y : y).toString();
  }
  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {
      this.submitInvalid = false;
      this.formF5.steps.step1 = true
      this.formService.saveFormDataFId(this.formF5, this.formId);
      this.step.emit('2');
    } else {
      // console.log("entro", step1Form.valid)
      this.submitInvalid = true;
      this.showActivePopUp(true);

      this.MessaggePopUp.titulo = 'Alerta';
      this.MessaggePopUp.descripcion =
        'Hay campos sin diligenciar, verificar para continuar. *Los campos faltantes se muestran en rojo.';
      this.MessaggePopUp.tipe = 'alert';

      // @ts-ignore: Desactivar comprobaciones de TypeScript para esta sección
    }
  }
  showActivePopUp(status: boolean) {
    this.ShowPopUp = status;
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
