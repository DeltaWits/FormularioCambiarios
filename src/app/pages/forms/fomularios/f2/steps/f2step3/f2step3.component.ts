import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { ToolImgComponent } from 'src/app/components/Modals/tool-img/tool-img.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { numeralesCambiariosF2 } from 'src/app/utils/formF2';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';

@Component({
  selector: 'app-f2step3',
  standalone: true,
  imports: [FormsModule, ToolImgComponent, ReactiveFormsModule, SharedModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent],

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
    },
    observaciones: ''
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
      // Get the numeric values for comparison
      const reintegroNeto = parseFloat(this.formF2.informacion_DIAN_total.Reintegro_neto.replace(/,/g, '.').replace(/\./g, ''));
      const valorTotalDolares = parseFloat(this.formF2.descripcion_de_la_operacion.valor_total_dolares.replace(/,/g, '.').replace(/\./g, ''));
      const valorReintegradoUSD = parseFloat(this.formF2.informacion_DIAN[0].valor_reintegrado_en_USD?.replace(/,/g, '.').replace(/\./g, '') || '0');

      // Round both numbers to 4 decimal places for comparison
      const reintegroNetoRounded = Math.round(parseFloat(this.formF2.informacion_DIAN_total.Reintegro_neto));
      const valorTotalDolaresRounded = Math.round(parseFloat(this.formF2.descripcion_de_la_operacion.valor_total_dolares));
      // Check if values are valid numbers
      const isReintegroValid = !isNaN(reintegroNetoRounded) && !isNaN(valorTotalDolaresRounded);
      const isValorReintegradoValid = !isNaN(valorReintegradoUSD);
      console.log(isReintegroValid, reintegroNetoRounded, valorTotalDolaresRounded, isValorReintegradoValid)
      if (isReintegroValid && reintegroNetoRounded === valorTotalDolaresRounded && isValorReintegradoValid) {
        this.formF2.steps.step1 = true
        this.formService.saveFormDataFId(this.formF2, this.formId, true);


        this.router.navigateByUrl('/forms');
      } else {
        this.showActivePopUp(true);

        this.MessaggePopUp.titulo = 'Alerta';
        this.MessaggePopUp.descripcion =
          'El reintegro neto debe ser igual al valor total en dólares';
        this.MessaggePopUp.tipe = 'alert';

      }
    } else {
      this.submitInvalid = true;
      this.showActivePopUp(true);

      this.MessaggePopUp.titulo = 'Alerta';
      this.MessaggePopUp.descripcion =
      'Hay campos sin diligenciar, verificar para continuar. *Los campos faltantes se muestran en rojo.';
      this.MessaggePopUp.tipe = 'alert';

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
    const operacion = this.formF2.descripcion_de_la_operacion;

    if (
      operacion.tasa_de_cambio !== '' &&
      operacion.vr_total_mda_negociacion !== ''
    ) {
      const tasaDeCambio = operacion.tasa_de_cambio.toString();
      const vrTotal = operacion.vr_total_mda_negociacion.toString();
      if (!isNaN(parseFloat(tasaDeCambio)) && !isNaN(parseFloat(vrTotal))) {
        const resultado = parseFloat(tasaDeCambio) * parseFloat(vrTotal);
        const decimalPlaces = resultado.toString().includes('.')
          ? resultado.toString().split('.')[1].length
          : 0;
        const fractionDigits = Math.min(decimalPlaces, 10);
        operacion.valor_total_dolares = resultado.toLocaleString('de-DE', {
          minimumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          maximumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          useGrouping: true,
        });
      } else {
        operacion.valor_total_dolares = '';
      }
    } else {
      operacion.valor_total_dolares = '';
    }
  }



  validateDIAN(i: number) {
    const informacionDIAN = this.formF2.informacion_DIAN;
    const totales = this.formF2.informacion_DIAN_total;

    const infoActual = informacionDIAN[i];

    // Validar que existan valores para operar
    if (
      infoActual?.valor_reintegrado_en_USD &&
      infoActual?.numeral_cambiario
    ) {
      let sumaFOB = 0;
      let sumaGastos = 0;

      informacionDIAN.forEach((info: any) => {
        const monto = parseFloat(info.valor_reintegrado_en_USD);

        if (!isNaN(monto)) {
          if (info.numeral_cambiario !== '1510') {
            sumaFOB += monto;
          } else {
            sumaGastos += monto;
          }
        }
      });

      const deducciones = parseFloat(totales?.Deducciones) || 0;
      const reintegroNeto = sumaFOB + sumaGastos - deducciones;

      // Guardar resultados con formato europeo
      totales.total_valorFoB = sumaFOB.toLocaleString('de-DE', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      });

      totales.total_gastos_de_exportacion = sumaGastos.toLocaleString('de-DE', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      });

      totales.Reintegro_neto = reintegroNeto.toLocaleString('de-DE', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      });
    }
  }


}
