// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import {
  IFormF5,
  numeralesCambiariosF5Ingreso,
  numeralesCambiariosF5Egreso,
} from 'src/app/utils/formF5';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { ToolImgComponent } from '../../../../../../components/Modals/tool-img/tool-img.component';
import { dolarFormatPipe } from '../../../../../../pipes/currency-format.pipe';

@Component({
  selector: 'app-f5step2',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgIf,
    NgFor,
    PopUpAlertComponent,
    ToolImgComponent,
  ],
  templateUrl: './f5step2.component.html',
  styleUrl: './f5step2.component.scss',
})
export class F5step2Component {
  @Input() monedas: any = [];
  @Input() formId = '';
  @Input() formF5: IFormF5 = {
    descripcion_de_la_operacion: {
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: 0,
    },
    informacion_de_la_operacion: [
      {
        numero_cambiario: '',
        valor_total_dolares: '',
      },
    ],
    observaciones: '',
    valor_total_operaciones: 0,
  };
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false;
  numeralesCambiarios: any = numeralesCambiariosF5Ingreso;
  numeralesCambiariosEgreso: any = numeralesCambiariosF5Egreso;
  ShowPopUp = false;
  exchangeRates = exchangeRates;
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
  ) {
    this.loadExcelFromCiiu();
  }

  totalOperaciones = 0;
  parseNumber(numStr: string | number): number {
    // Handle if already a number
    if (typeof numStr === 'number') {
      return numStr;
    }
    // Handle empty or invalid strings
    if (!numStr || typeof numStr !== 'string') {
      return 0;
    }

    // Detect format based on content
    const hasDot = numStr.includes('.');
    const hasComma = numStr.includes(',');

    let cleaned: string;

    if (hasDot && hasComma) {
      // Has both: German format (1.234,56) or US format with thousands (1,234.56)
      // Check which appears last to determine decimal separator
      const lastDotIndex = numStr.lastIndexOf('.');
      const lastCommaIndex = numStr.lastIndexOf(',');

      if (lastCommaIndex > lastDotIndex) {
        // German format: dot is thousand separator, comma is decimal
        cleaned = numStr.replace(/\./g, '').replace(',', '.');
      } else {
        // US format: comma is thousand separator, dot is decimal
        cleaned = numStr.replace(/,/g, '');
      }
    } else if (hasComma) {
      // Only comma: assume it's decimal separator (German format like 370,01)
      cleaned = numStr.replace(',', '.');
    } else if (hasDot) {
      // Only dot: could be decimal (370.01) or thousands (1.234)
      // If there are more than 3 digits after the last dot, it's a thousand separator
      // If 1-2 digits after dot, it's likely decimal
      const parts = numStr.split('.');
      const afterDot = parts[parts.length - 1];

      if (parts.length > 2 || (parts.length === 2 && afterDot.length > 2)) {
        // Multiple dots or more than 2 digits after dot = thousand separator
        cleaned = numStr.replace(/\./g, '');
      } else {
        // Single dot with 1-2 digits after = decimal separator
        cleaned = numStr;
      }
    } else {
      // No separators: just a plain number
      cleaned = numStr;
    }

    const result = parseFloat(cleaned);
    return isNaN(result) ? 0 : result;
  }
  validateForm(step1Form: NgForm) {
    if (step1Form.valid) {
      this.submitInvalid = false;

      const operacionesClean = this.parseNumber(
        this.formF5.valor_total_operaciones
      );
      const dolaresClean = this.parseNumber(
        this.formF5.descripcion_de_la_operacion.valor_total_dolares
      );

      // Round to 2 decimal places for comparison
      const operaciones = Math.round(operacionesClean * 100) / 100;
      const dolares = Math.round(dolaresClean * 100) / 100;

      console.log('operaciones', operaciones);
      console.log('dolares', dolares);
      if (operaciones === dolares) {
        this.formF5.steps.step1 = true;
        this.formService.saveFormDataFId(this.formF5, this.formId, true);

        this.router.navigateByUrl('/forms');
      } else {
        this.showActivePopUp(true);

        this.MessaggePopUp.titulo = 'Alerta';
        this.MessaggePopUp.descripcion =
          'El valor total de las operaciones debe ser igual al valor total en dólares';
        this.MessaggePopUp.tipe = 'alert';
      }
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
  agregarOPeracion() {
    this.formF5.informacion_de_la_operacion.push({
      numero_cambiario: '',
      valor_total_dolares: '',
    });
  }
  deleteOperacion(index: number) {
    this.formF5.informacion_de_la_operacion.splice(index, 1);
  }

  selectTasa() {
    const operacion = this.formF5.descripcion_de_la_operacion;

    if (
      operacion.tasa_de_cambio_dolar !== '' &&
      operacion.vr_total_mda_negociacion !== ''
    ) {
      const tasaDeCambio = this.parseNumber(operacion.tasa_de_cambio_dolar);
      const vrTotal = this.parseNumber(operacion.vr_total_mda_negociacion);

      if (!isNaN(tasaDeCambio) && !isNaN(vrTotal)) {
        const resultado = tasaDeCambio * vrTotal;
        const decimalPlaces = resultado.toString().includes('.')
          ? resultado.toString().split('.')[1].length
          : 0;
        const fractionDigits = Math.min(decimalPlaces, 2);

        operacion.valor_total_dolares = resultado.toLocaleString('de-DE', {
          minimumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
          maximumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
          useGrouping: true,
        });
      } else {
        operacion.valor_total_dolares = '';
      }
    } else {
      operacion.valor_total_dolares = '';
    }
  }

  // validateDIAN(i: any) {
  //   if (this.formF5.informacion_DIAN[i].valor_reintegrado_en_USD != '' && this.formF5.informacion_DIAN[i].numeral_cambiario != '') {
  //     let sumaFOB = 0, sumaGastos = 0, sumaDeducciones = 0
  //     this.formF5.informacion_DIAN.forEach((info: any) => {
  //       console.log("sdsd", info.numeral_cambiario)
  //       if (info.numeral_cambiario != '1510') {
  //         sumaFOB = sumaFOB + parseFloat(info.valor_reintegrado_en_USD)
  //       } else if (info.numeral_cambiario == '1510') {
  //         sumaGastos = sumaGastos + parseFloat(info.valor_reintegrado_en_USD)
  //       }
  //     });

  //     this.formF5.informacion_DIAN_total.total_valorFoB = sumaFOB
  //     this.formF5.informacion_DIAN_total.total_gastos_de_exportacion = sumaGastos
  //     this.formF5.informacion_DIAN_total.Reintegro_neto = sumaFOB + sumaGastos - this.formF5.informacion_DIAN_total.Deducciones.replace(/[^\d]/g, '')
  //   }
  // }

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
  validateTotalOperacion(i: number) {
    console.log('validateTotalOperacion', i);
    const operacion = this.formF5.informacion_de_la_operacion;
    const totales = this.formF5.valor_total_operaciones;

    const infoActual = operacion[i];

    // Validar que existan valores para operar
    if (infoActual?.valor_total_dolares && infoActual?.numero_cambiario) {
      let sumaFOB = 0;
      let sumaGastos = 0;

      operacion.forEach((info: any) => {
        const monto = this.parseNumber(info.valor_total_dolares);

        if (!isNaN(monto)) {
          if (info.numero_cambiario !== '1510') {
            sumaFOB += monto;
          } else {
            sumaGastos += monto;
          }
        }
      });

      const reintegroNeto = sumaFOB + sumaGastos;
      console.log('reintegroNeto', reintegroNeto);
      // Guardar resultados con formato europeo
      this.formF5.valor_total_operaciones = reintegroNeto.toLocaleString(
        'de-DE',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );

      this.formF5.valor_total_operaciones = reintegroNeto.toLocaleString(
        'de-DE',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    }
  }
}
