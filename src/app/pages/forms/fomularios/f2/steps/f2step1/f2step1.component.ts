import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { textTipoOperacion } from '../../textosF2';
import { NgFor, NgIf } from '@angular/common';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { textTipoIdentidad } from '../../../f1/textosF1';

@Component({
  selector: 'app-f2step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent],
  templateUrl: './f2step1.component.html',
  styleUrl: './f2step1.component.scss'
})
export class F2step1Component implements OnInit {
  @Input() monedas: any = [];
  @Input() formId = ''
  textTipoIdentidad = textTipoIdentidad
  textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  @Input() formF2: any = {
    tipo_de_operacion: '',
    tipo_de_moneda_operacion: '',
    identificacion_de_la_operacion: {
      fecha_tramite: '',
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
  }
  ShowPopUp = false;

  selectDocPN = tiposDocumentos;
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
    console.log("monedas", this.monedas)
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
      this.formF2.identificacion_de_la_operacion.dv = this.calculateDV(
        this.formF2.identificacion_de_la_operacion.nit_imc
      );
    } else if (

      inputNum == 2
    ) {
      this.formF2.identificacion_operacion_anterior.dv = this.calculateDV(
        this.formF2.identificacion_operacion_anterior.nit_imc
      );
    } else if (
      inputNum == 3
    ) {
      this.formF2.identificacion_de_exportador.dv = this.calculateDV(
        this.formF2.identificacion_de_exportador.numero_documento
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
      this.formF2.steps.step1 = true
      this.formService.saveFormDataFId(this.formF2, this.formId);
      this.step.emit('2');
    } else {
      console.log("entro", step1Form.valid)
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
}

