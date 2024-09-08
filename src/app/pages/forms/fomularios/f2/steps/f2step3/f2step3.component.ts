import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { numeralesCambiariosF2 } from 'src/app/utils/formF2';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';

@Component({
  selector: 'app-f2step3',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SharedModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent],

  templateUrl: './f2step3.component.html',
  styleUrl: './f2step3.component.scss'
})
export class F2step3Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF2: any = {
    descripcion_de_la_operacion: {

      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio: '',
      valor_total_dolares: '',
    },
    informacion_DIAN: [{
      numero_o_factura: '',
      numeral_cambiario: '',
      valor_reintegrado_en_USD: ''
    }],
    informacion_DIAN_total: {
      total_valorFoB: '',
      total_gastos_de_exportacion: '',
      Deducciones: '',
      Reintegro_neto: ''
    }
  }

  numeralesCambiarios: any = numeralesCambiariosF2
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
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
      if (this.formF2.informacion_DIAN_total.Reintegro_neto == this.formF2.descripcion_de_la_operacion.valor_total_dolares) {
        this.formF2.steps.step1 = true
        this.formService.saveFormDataFId(this.formF2, this.formId, true);


        this.router.navigateByUrl('/forms');
      } else {
        this.showActivePopUp(true);

        this.MessaggePopUp.titulo = 'Alerta';
        this.MessaggePopUp.descripcion =
          'El reintegro neto debe ser igual al valor total en dolares';
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
  agregarDIAN() {
    this.formF2.informacion_DIAN.push({
      numero_o_factura: '',
      numeral_cambiario: '',
      valor_reintegrado_en_USD: ''
    })
  }
  deleteDIAN(index: number) {
    this.formF2.informacion_DIAN.splice(
      index,
      1,
    );
  }
  agregarImportador() {
    this.formF2.descripcion_de_la_operacion.push({
      numero_cambiario: '',
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio: '',
      valor_total_dolares: '',
    })
  }
  deleteImportador(index: number) {
    this.formF2.descripcion_de_la_operacion.splice(
      index,
      1,
    );
  }
  selectTasa() {
    // const currency = exchangeRates.find(rate => rate.code === this.formF2.descripcion_de_la_operacion[index].cod_mda_negociacion);
    // @ts-ignore:
    if (this.formF2.descripcion_de_la_operacion.tasa_de_cambio != '' && this.formF2.descripcion_de_la_operacion.vr_total_mda_negociacion != ' ') {
      const tasaDeCambio = this.formF2.descripcion_de_la_operacion.tasa_de_cambio;
      const vrTotalMdaNegociacion = this.formF2.descripcion_de_la_operacion.vr_total_mda_negociacion.replace(/[^\d]/g, '');
      // console.log("valorTM", vrTotalMdaNegociacion)
      this.formF2.descripcion_de_la_operacion.valor_total_dolares = parseFloat(
        (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
      );
    }
  }
  validateDIAN(i: any) {
    if (this.formF2.informacion_DIAN[i].valor_reintegrado_en_USD != '' && this.formF2.informacion_DIAN[i].numeral_cambiario != '') {
      let sumaFOB = 0, sumaGastos = 0, sumaDeducciones = 0
      this.formF2.informacion_DIAN.forEach((info: any) => {
        console.log("sdsd", info.numeral_cambiario)
        if (info.numeral_cambiario != '1510') {
          sumaFOB = sumaFOB + parseFloat(info.valor_reintegrado_en_USD)
        } else if (info.numeral_cambiario == '1510') {
          sumaGastos = sumaGastos + parseFloat(info.valor_reintegrado_en_USD)
        }
      });

      this.formF2.informacion_DIAN_total.total_valorFoB = sumaFOB
      this.formF2.informacion_DIAN_total.total_gastos_de_exportacion = sumaGastos
      this.formF2.informacion_DIAN_total.Reintegro_neto = sumaFOB + sumaGastos - this.formF2.informacion_DIAN_total.Deducciones.replace(/[^\d]/g, '')
    }
  }
}
