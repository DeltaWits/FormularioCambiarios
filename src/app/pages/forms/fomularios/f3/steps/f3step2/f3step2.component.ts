// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { IFormF3, numeralesCambiariosF3 } from 'src/app/utils/formF3';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { PopUpAlertComponent } from "../../../../../../components/Modals/pop-up-alert/pop-up-alert.component";

@Component({
  selector: 'app-f3step2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],
  templateUrl: './f3step2.component.html',
  styleUrl: './f3step2.component.scss'
})
export class F3step2Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF3: IFormF3 = {
    detalle_de_la_declaracion: {
      codigo_moneda: '',
      valor_total_moneda: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: '',
      tasa_cambio_moneda_negociacion: '',

      valor_moneda_stipulada: '',
    },
    informacion_de_numerales: [{
      numeral_cambiario: '',
      valor_total_moneda: '',
      valor_dolares: '',
      valor_moneda_estipulada: '',
    }]
  }
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  numeralesCambiarios: any = numeralesCambiariosF3
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
  ) { }

  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {


      this.submitInvalid = false;
      let suma = 0
      this.formF3.informacion_de_numerales.map((numeral) => {
        suma = suma + parseFloat(numeral.valor_moneda_estipulada)
      })
      if (suma == this.formF3.detalle_de_la_declaracion.valor_moneda_stipulada) {
        this.formF3.steps.step1 = true
        this.formService.saveFormDataFId(this.formF3, this.formId, true);


        this.router.navigateByUrl('/forms');
      } else {
        this.showActivePopUp(true);

        this.MessaggePopUp.titulo = 'Alerta';
        this.MessaggePopUp.descripcion =
          'La suma de los valores de moneda estipulada debe ser igual al valor total de moneda estipulada';
        this.MessaggePopUp.tipe = 'alert';

      }
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
  agregarInfo() {
    this.formF3.informacion_de_numerales.push({
      numeral_cambiario: '',
      valor_total_moneda: '',
      valor_dolares: '',
      valor_moneda_estipulada: '',
    })
  }
  deleteInfo(index: number) {
    this.formF3.informacion_de_numerales.splice(
      index,
      1,
    );
  }
  // agregarImportador() {
  //   this.formF3.detalle_de_la_declaracion.push({
  //     numero_cambiario: '',
  //     cod_mda_negociacion: '',
  //     vr_total_mda_negociacion: '',
  //     tasa_de_cambio: '',
  //     valor_total_dolares: '',
  //   })
  // }
  // deleteImportador(index: number) {
  //   this.formF3.detalle_de_la_declaracion.splice(
  //     index,
  //     1,
  //   );
  // }
  selectTasa(num: number) {
    // const currency = exchangeRates.find(rate => rate.code === this.formF3.detalle_de_la_declaracion[index].cod_mda_negociacion);
    // @ts-ignore:
    if (num == 1) {
      if (this.formF3.detalle_de_la_declaracion.tasa_de_cambio_dolar != '' && this.formF3.detalle_de_la_declaracion.valor_total_moneda != '') {
        const tasaDeCambio = this.formF3.detalle_de_la_declaracion.tasa_de_cambio_dolar;
        const vrTotalMdaNegociacion = this.formF3.detalle_de_la_declaracion.valor_total_moneda.replace(/[^\d]/g, '');
        // console.log("valorTM", vrTotalMdaNegociacion)
        this.formF3.detalle_de_la_declaracion.valor_total_dolares = parseFloat(
          (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
        );
      }
    } else if (num == 2) {
      if (this.formF3.detalle_de_la_declaracion.tasa_cambio_moneda_negociacion != '' && this.formF3.detalle_de_la_declaracion.valor_total_moneda != '') {
        const tasaDeCambio = this.formF3.detalle_de_la_declaracion.tasa_cambio_moneda_negociacion;
        const vrTotalMdaNegociacion = this.formF3.detalle_de_la_declaracion.valor_total_moneda.replace(/[^\d]/g, '');
        // console.log("valorTM", vrTotalMdaNegociacion)
        this.formF3.detalle_de_la_declaracion.valor_moneda_stipulada = parseFloat(
          (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
        );
      }
    }
  }
}
