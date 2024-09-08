// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { numeralesCambiariosF4 } from 'src/app/utils/formF4';
import { IFormF4 } from 'src/app/utils/formF4';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';

@Component({
  selector: 'app-f4step2',
  standalone: true,

  imports: [FormsModule, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],
  templateUrl: './f4step2.component.html',
  styleUrl: './f4step2.component.scss'
})
export class F4step2Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF4: IFormF4 = {


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
    descripcionde_la_operacion: {
      numeral_cambiario: '',
      codigo_moneda: '',
      valor_moneda_negociacion: '',
      numero_prestamo_aval: '',
      tasa_cambio_dolar: '',
      valor_total_dolares: '',
      moneda_registro: 'COP',
      tasa_cambio_pesos: '',
      valor_total_pesos: '',
      participantes: '',
      motivo_sin_participantes: ''

    },
    informacion_residente: {
      numeral_cambiario: '',
      naturaleza: '',
      tipo_empresa: '',
      es_vigilado_superintendencia: '',
      cual_superintendencia: '',
      sector: '',

    }
  }
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  numeralesCambiarios: any = numeralesCambiariosF4
  ShowPopUp = false;
  exchangeRates = exchangeRates
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };
  selectDocPN = tiposDocumentos;

  constructor(
    // private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) { this.formF4.descripcionde_la_operacion.moneda_registro = 'COP' }

  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {


      this.submitInvalid = false;
      let suma = 0

      this.formF4.steps.step1 = true
      this.formService.saveFormDataFId(this.formF4, this.formId, true);


      this.router.navigateByUrl('/forms');

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
  // agregarInfo() {
  //   this.formF4.informacion_de_numerales.push({
  //     numeral_cambiario: '',
  //     valor_total_moneda: '',
  //     valor_dolares: '',
  //     valor_moneda_estipulada: '',
  //   })
  // }
  // deleteInfo(index: number) {
  //   this.formF4.informacion_de_numerales.splice(
  //     index,
  //     1,
  //   );
  // }
  // agregarImportador() {
  //   this.formF4.descripcionde_la_operacion.push({
  //     numero_cambiario: '',
  //     cod_mda_negociacion: '',
  //     vr_total_mda_negociacion: '',
  //     tasa_de_cambio: '',
  //     valor_total_dolares: '',
  //   })
  // }
  // deleteImportador(index: number) {
  //   this.formF4.descripcionde_la_operacion.splice(
  //     index,
  //     1,
  //   );
  // }
  selectTasa(num: number) {
    // const currency = exchangeRates.find(rate => rate.code === this.formF4.descripcionde_la_operacion[index].cod_mda_negociacion);
    // @ts-ignore:

    if (this.formF4.descripcionde_la_operacion.tasa_cambio_dolar != '' && this.formF4.descripcionde_la_operacion.valor_moneda_negociacion != '') {
      const tasaDeCambio = this.formF4.descripcionde_la_operacion.tasa_cambio_dolar;
      const vrTotalMdaNegociacion = this.formF4.descripcionde_la_operacion.valor_moneda_negociacion.replace(/[^\d]/g, '');
      // console.log("valorTM", vrTotalMdaNegociacion)
      this.formF4.descripcionde_la_operacion.valor_total_dolares = parseFloat(
        (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
      );

      if (this.formF4.descripcionde_la_operacion.tasa_cambio_pesos != '' && this.formF4.descripcionde_la_operacion.valor_total_moneda != '') {
        const tasaDeCambio = this.formF4.descripcionde_la_operacion.tasa_cambio_pesos;
        const vrTotalMdaNegociacion = this.formF4.descripcionde_la_operacion.valor_moneda_negociacion.replace(/[^\d]/g, '');
        // console.log("valorTM", vrTotalMdaNegociacion)
        this.formF4.descripcionde_la_operacion.valor_total_pesos = parseFloat(
          (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
        );

      }
    }
  }
}
