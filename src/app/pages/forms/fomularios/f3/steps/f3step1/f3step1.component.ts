// @ts-nocheck
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { IFormF3 } from 'src/app/utils/formF3';
import { textTipoOperacion } from '../../textosF3';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { SharedModule } from 'src/app/shared.module';
import { PopUpAlertComponent } from "../../../../../../components/Modals/pop-up-alert/pop-up-alert.component";
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-f3step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, SharedModule, PopUpAlertComponent, NgIf, NgFor],
  templateUrl: './f3step1.component.html',
  styleUrl: './f3step1.component.scss'
})
export class F3step1Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF3: IFormF3 = {
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
    detalle_de_la_declaracion: {
      codigo_moneda: '',
      valor_total_moneda: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: '',
      tasa_cambio_moneda_negociacion: '',

      valor_moneda_stipulada: '',
    }
  }
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  textTipoOperacion = textTipoOperacion

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
  }// @ts-nocheck
  checkDv1(inputNum: number) {
    if (

      inputNum == 1
    ) {



      this.formF3.identificacion_de_la_declaracion.dv = this.calculateDV(

        this.formF3.identificacion_de_la_declaracion.nit_imc
      );
    } else if (

      inputNum == 2
    ) {
      this.formF3.identificacion_operacion_anterior.dv = this.calculateDV(

        this.formF3.identificacion_operacion_anterior.nit_imc
      );
    } else if (
      inputNum == 3
    ) {
      this.formF3.detalle_del_credito.dv = this.calculateDV(
        this.formF3.detalle_del_credito.numero_identificacion
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
      this.formF3.steps.step1 = true
      this.formService.saveFormDataFId(this.formF3, this.formId);
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
}
