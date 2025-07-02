// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { IFormF6, numeralesCambiariosF6 } from 'src/app/utils/formF6';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { codigoPropositoPrestamo, tasasInteres } from 'src/app/utils/formF6';

@Component({
  selector: 'app-f6step2',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],

  templateUrl: './f6step2.component.html',
  styleUrl: './f6step2.component.scss'
})
export class F6step2Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF6: IFormF6 = {

    descripcion_del_prestamo: {
      codigo_proposito_prestamo: '',
      codigo_moneda: '',
      valor_moneda_estipulada: '',
      tasa_interes: '',
      spread_valor: '',
      plazo: '',
      tiempo: '',
      numero_deposito_dinanciacion: ''
    },
    plan_de_armonizacion: [{
      fecha: '',
      valor_cuota: '',

    }],
    informacion_transmision_procedimientos_credito: {
      tipo_transmision: '',
      numero_de_creaditos_sustituir: '',
      codigo_moneda: ''
    },
    datos_del_deudor: {
      naturaleza: '',
      tipo_empresa: '',
      es_vigilado_superintendencia: '',
      cual_superintendencia: '',
      sector: ''
    },
  }
  codigoPropositoPrestamo = codigoPropositoPrestamo;
  tasasInteres = tasasInteres;
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  numeralesCambiarios: any = numeralesCambiariosF6
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
  ) {
  }

  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {


      this.submitInvalid = false;
      let suma = 0

      this.formF6.steps.step1 = true
      this.formService.saveFormDataFId(this.formF6, this.formId, true);


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
  agregarPlan() {
    this.formF6.plan_de_armonizacion.push({
      fecha: '',
      valor_cuota: '',
    })
  }
  deletePlan(index: number) {
    this.formF6.plan_de_armonizacion.splice(
      index,
      1,
    );
  }
  // agregarImportador() {
  //   this.formF6.descripcionde_la_operacion.push({
  //     numero_cambiario: '',
  //     cod_mda_negociacion: '',
  //     vr_total_mda_negociacion: '',
  //     tasa_de_cambio: '',
  //     valor_total_dolares: '',
  //   })
  // }
  // deleteImportador(index: number) {
  //   this.formF6.descripcionde_la_operacion.splice(
  //     index,
  //     1,
  //   );
  // }
  // selectTasa(num: number) {
  //   // const currency = exchangeRates.find(rate => rate.code === this.formF6.descripcionde_la_operacion[index].cod_mda_negociacion);
  //   // @ts-ignore:

  //   if (this.formF6.descripcionde_la_operacion.tasa_cambio_dolar != '' && this.formF6.descripcionde_la_operacion.valor_moneda_negociacion != '') {
  //     const tasaDeCambio = this.formF6.descripcionde_la_operacion.tasa_cambio_dolar;
  //     const vrTotalMdaNegociacion = this.formF6.descripcionde_la_operacion.valor_moneda_negociacion.replace(/[^\d]/g, '');
  //     // console.log("valorTM", vrTotalMdaNegociacion)
  //     this.formF6.descripcionde_la_operacion.valor_total_dolares = parseFloat(
  //       (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
  //     );

  //     if (this.formF6.descripcionde_la_operacion.tasa_cambio_pesos != '' && this.formF6.descripcionde_la_operacion.valor_total_moneda != '') {
  //       const tasaDeCambio = this.formF6.descripcionde_la_operacion.tasa_cambio_pesos;
  //       const vrTotalMdaNegociacion = this.formF6.descripcionde_la_operacion.valor_moneda_negociacion.replace(/[^\d]/g, '');
  //       // console.log("valorTM", vrTotalMdaNegociacion)
  //       this.formF6.descripcionde_la_operacion.valor_total_pesos = parseFloat(
  //         (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
  //       );

  //     }
  //   }
  // }
  getPaises() {
    // this.paises = Object.keys(countries).map((code) => {
    //   return {
    //     name: (countries as { [code: string]: Country })[code].name,
    //     code: code,
    //   };
    // });
    const fileUrl = '../../../../../../../assets/paises.xlsx';
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        if (arrayBuffer) {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
            type: 'array',
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.paises = XLSX.utils.sheet_to_json(worksheet, {
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
}
