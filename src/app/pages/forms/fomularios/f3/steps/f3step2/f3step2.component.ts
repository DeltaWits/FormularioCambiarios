// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { IFormF3, numeralesCambiariosF3Egreso, numeralesCambiariosF3Ingreso } from 'src/app/utils/formF3';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { PopUpAlertComponent } from "../../../../../../components/Modals/pop-up-alert/pop-up-alert.component";
import { ToolImgComponent } from 'src/app/components/Modals/tool-img/tool-img.component';

@Component({
  selector: 'app-f3step2',
  standalone: true,
  imports: [FormsModule, ToolImgComponent, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],
  templateUrl: './f3step2.component.html',
  styleUrl: './f3step2.component.scss'
})
export class F3step2Component implements OnInit {
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
  numeralesCambiarios: any = []
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
  ngOnInit(): void {
    this.validateNumerales()
  }
  validateNumerales() {
    if (this.formF3.tipo_de_operacion.ingreso_o_egreso == 'Ingreso') {
      this.numeralesCambiarios = numeralesCambiariosF3Ingreso
    } else {
      this.numeralesCambiarios = numeralesCambiariosF3Egreso
    }
  }
  validateForm(step1Form: NgForm) {
    if (step1Form.valid) {
      this.submitInvalid = false;
  
      // Get the total stipulated value and clean it
      const totalStipulated = this.formF3.detalle_de_la_declaracion.valor_moneda_stipulada;
      const totalStipulatedClean = parseFloat(totalStipulated?.replace(/,/g, '.').replace(/\./g, '') || '0');
  
      // Calculate sum of numeral values
      let suma = 0;
      this.formF3.informacion_de_numerales.forEach((numeral) => {
        const valor = numeral.valor_moneda_estipulada;
        const valorClean = parseFloat(valor?.replace(/,/g, '.').replace(/\./g, '') || '0');
        suma += valorClean;
      });
  
      // Round both numbers to 4 decimal places for accurate comparison
      const sumaRounded = Math.round(suma * 10000) / 10000;
      const totalRounded = Math.round(totalStipulatedClean * 10000) / 10000;
  
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
  // selectTasa(num: number) {
  //   const detalle = this.formF3.detalle_de_la_declaracion;

  //   // Limpiar y convertir valor total moneda
  //   const valorMonedaLimpio = detalle.valor_total_moneda
  //     ?.replace(/\./g, '')
  //     ?.replace(',', '.');

  //   const valorTotal = parseFloat(valorMonedaLimpio);

  //   if (!isNaN(valorTotal)) {
  //     if (num === 1 && detalle.tasa_de_cambio_dolar !== '') {
  //       const tasa = parseFloat(
  //         detalle.tasa_de_cambio_dolar.toString().replace(',', '.')
  //       );

  //       if (!isNaN(tasa)) {
  //         const resultado = tasa * valorTotal;

  //         detalle.valor_total_dolares = resultado.toLocaleString('de-DE', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2
  //         });
  //       } else {
  //         detalle.valor_total_dolares = '';
  //       }

  //     } else if (num === 2 && detalle.tasa_cambio_moneda_negociacion !== '') {
  //       const tasa = parseFloat(
  //         detalle.tasa_cambio_moneda_negociacion.toString().replace(',', '.')
  //       );

  //       if (!isNaN(tasa)) {
  //         const resultado = tasa * valorTotal;

  //         detalle.valor_moneda_stipulada = resultado.toLocaleString('de-DE', {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2
  //         });
  //       } else {
  //         detalle.valor_moneda_stipulada = '';
  //       }
  //     }
  //   }
  // }
  selectTasa(num: number) {

    const detalle = this.formF3.detalle_de_la_declaracion;
    if (num === 1 && detalle.tasa_de_cambio_dolar !== '') {

      if (
        detalle.tasa_de_cambio_dolar !== '' &&
        detalle.valor_total_moneda !== ''
      ) {
        const tasaDeCambio = detalle.tasa_de_cambio_dolar.toString();
        const vrTotal = detalle.valor_total_moneda.toString();
        if (!isNaN(parseFloat(tasaDeCambio)) && !isNaN(parseFloat(vrTotal))) {
          const resultado = parseFloat(tasaDeCambio) * parseFloat(vrTotal);
          const decimalPlaces = resultado.toString().includes('.')
            ? resultado.toString().split('.')[1].length
            : 0;
          const fractionDigits = Math.min(decimalPlaces, 10);
          detalle.valor_total_dolares = resultado.toLocaleString('de-DE', {
            minimumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
            maximumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
            useGrouping: true,
          });
        } else {
          detalle.valor_total_dolares = '';
        }
      } else {
        detalle.valor_total_dolares = '';
      }

    } else if (num === 2 && detalle.tasa_cambio_moneda_negociacion !== '') {

      if (
        detalle.tasa_cambio_moneda_negociacion !== '' &&
        detalle.valor_total_moneda !== ''
      ) {
        const tasaDeCambio = detalle.tasa_cambio_moneda_negociacion.toString();
        const vrTotal = detalle.valor_total_moneda.toString();
        if (!isNaN(parseFloat(tasaDeCambio)) && !isNaN(parseFloat(vrTotal))) {
          const resultado = parseFloat(tasaDeCambio) * parseFloat(vrTotal);
          const decimalPlaces = resultado.toString().includes('.')
            ? resultado.toString().split('.')[1].length
            : 0;
          const fractionDigits = Math.min(decimalPlaces, 10);
          detalle.valor_moneda_stipulada = resultado.toLocaleString('de-DE', {
            minimumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
            maximumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
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
