// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import {
  IFormF3,
  numeralesCambiariosF3Egreso,
  numeralesCambiariosF3Ingreso,
} from 'src/app/utils/formF3';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { PopUpAlertComponent } from '../../../../../../components/Modals/pop-up-alert/pop-up-alert.component';
import { ToolImgComponent } from 'src/app/components/Modals/tool-img/tool-img.component';

@Component({
  selector: 'app-f3step2',
  standalone: true,
  imports: [
    FormsModule,
    ToolImgComponent,
    ReactiveFormsModule,
    SharedModule,
    NgFor,
    NgIf,
    PopUpAlertComponent,
  ],
  templateUrl: './f3step2.component.html',
  styleUrl: './f3step2.component.scss',
})
export class F3step2Component implements OnInit {
  @Input() monedas: any = [];
  @Input() formId = '';
  @Input() formF3: IFormF3 = {
    detalle_de_la_declaracion: {
      codigo_moneda: '',
      valor_total_moneda: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: '',
      tasa_cambio_moneda_negociacion: '',

      valor_moneda_stipulada: '',
    },
    informacion_de_numerales: [
      {
        numeral_cambiario: '',
        valor_total_moneda: '',
        valor_dolares: '',
        valor_moneda_estipulada: '',
      },
    ],
  };
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false;
  numeralesCambiarios: any = [];
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
  ) {}
  ngOnInit(): void {
    this.validateNumerales();
  }
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
  validateNumerales() {
    if (this.formF3.tipo_de_operacion.ingreso_o_egreso == 'Ingreso') {
      this.numeralesCambiarios = numeralesCambiariosF3Ingreso;
    } else {
      this.numeralesCambiarios = numeralesCambiariosF3Egreso;
    }
  }
  validateForm(step1Form: NgForm) {
    if (step1Form.valid) {
      this.submitInvalid = false;

      // Get the total stipulated value and clean it
      const totalStipulatedClean = this.parseNumber(
        this.formF3.detalle_de_la_declaracion.valor_moneda_stipulada
      );

      // Calculate sum of numeral values
      let suma = 0;
      this.formF3.informacion_de_numerales.forEach((numeral) => {
        const valor = numeral.valor_moneda_estipulada;
        const valorClean = this.parseNumber(valor);
        suma += valorClean;
      });

      // Round both numbers to 2 decimal places for comparison
      const sumaRounded = Math.round(suma * 100) / 100;
      const totalRounded = Math.round(totalStipulatedClean * 100) / 100;

      // Check if values are valid numbers
      const isValidNumbers = !isNaN(sumaRounded) && !isNaN(totalRounded);
      if (isValidNumbers && sumaRounded === totalRounded) {
        this.formF3.steps.step1 = true;
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
  agregarInfo() {
    this.formF3.informacion_de_numerales.push({
      numeral_cambiario: '',
      valor_total_moneda: '',
      valor_dolares: '',
      valor_moneda_estipulada: '',
    });
  }
  deleteInfo(index: number) {
    this.formF3.informacion_de_numerales.splice(index, 1);
  }
  selectTasa(num: number) {
    const detalle = this.formF3.detalle_de_la_declaracion;
    if ((num === 1 || num === 3) && detalle.tasa_de_cambio_dolar !== '') {
      if (
        detalle.tasa_de_cambio_dolar !== '' &&
        detalle.valor_total_moneda !== ''
      ) {
        const tasaDeCambio = this.parseNumber(detalle.tasa_de_cambio_dolar);
        const vrTotal = this.parseNumber(detalle.valor_total_moneda);
        if (!isNaN(tasaDeCambio) && !isNaN(vrTotal)) {
          const resultado = tasaDeCambio * vrTotal;
          const decimalPlaces = resultado.toString().includes('.')
            ? resultado.toString().split('.')[1].length
            : 0;
          const fractionDigits = Math.min(decimalPlaces, 2);
          detalle.valor_total_dolares = resultado.toLocaleString('de-DE', {
            minimumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
            maximumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
            useGrouping: true,
          });
        } else {
          detalle.valor_total_dolares = '';
        }
      } else {
        detalle.valor_total_dolares = '';
      }
    }
    if (
      (num === 2 || num === 3) &&
      detalle.tasa_cambio_moneda_negociacion !== ''
    ) {
      if (
        detalle.tasa_cambio_moneda_negociacion !== '' &&
        detalle.valor_total_moneda !== ''
      ) {
        const tasaDeCambio = this.parseNumber(
          detalle.tasa_cambio_moneda_negociacion
        );
        const vrTotal = this.parseNumber(detalle.valor_total_moneda);
        if (!isNaN(tasaDeCambio) && !isNaN(vrTotal)) {
          const resultado = tasaDeCambio * vrTotal;
          const decimalPlaces = resultado.toString().includes('.')
            ? resultado.toString().split('.')[1].length
            : 0;
          const fractionDigits = Math.min(decimalPlaces, 2);
          detalle.valor_moneda_stipulada = resultado.toLocaleString('de-DE', {
            minimumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
            maximumFractionDigits: fractionDigits < 2 ? fractionDigits : 2,
            useGrouping: true,
          });
        } else {
          detalle.valor_moneda_stipulada = '';
        }
      } else {
        detalle.valor_moneda_stipulada = '';
      }
    }
  }
}
