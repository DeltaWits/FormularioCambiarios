// @ts-nocheck
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { FormService } from 'src/app/services/form.service';
import { SharedModule } from 'src/app/shared.module';
import { numeralesCambiariosF4Egreso, numeralesCambiariosF4Ingreso } from 'src/app/utils/formF4';
import { IFormF4 } from 'src/app/utils/formF4';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { ToolImgComponent } from '../../../../../../components/Modals/tool-img/tool-img.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-f4step2',
  standalone: true,

  imports: [FormsModule, Tool1Component, ToolImgComponent, ReactiveFormsModule, SharedModule, NgFor, NgIf, PopUpAlertComponent],
  templateUrl: './f4step2.component.html',
  styleUrl: './f4step2.component.scss'
})
export class F4step2Component implements OnInit {
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
      participaciones: '',
      motivo_sin_participaciones: ''

    },
    informacion_residente: {
      numeral_cambiario: '',
      naturaleza: '',
      tipo_empresa: '',
      es_vigilado_superintendencia: '',
      cual_superintendencia: '',
      sector: '',

    },
    observaciones: ''
  }
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  
  paises: { Nombre: string | any; Codigo: string }[] = [];
  ciiu: any;
  submitInvalid = false
  numeralesCambiarios: any = numeralesCambiariosF4Ingreso
  ShowPopUp = false;
  exchangeRates = exchangeRates
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };
  selectDocR = tiposDocumentos;

  constructor(
    // private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) {
    this.formF4.descripcionde_la_operacion.moneda_registro = 'COP';
    
  }
  ngOnInit(): void {
    this.chagenIDOptions();
    this.validateNumerales()
    this.loadExcelFromCiiu()
    this.getPaises()
  }
  validateNumerales() {
    console.log("operacon", this.formF4.tipo_de_operacion.ingreso_o_egreso)
    if (this.formF4.tipo_de_operacion.ingreso_o_egreso == 'Ingreso') {
      this.numeralesCambiarios = numeralesCambiariosF4Ingreso
    } else {
      this.numeralesCambiarios = numeralesCambiariosF4Egreso
    }
  }
  chagenIDOptions() {
    if (this.formF4.destino_inversion == 'EMPA2') {
      this.selectDocR = [{
        code: 'TI',
        name: 'Tarjeta de identidad',
      }, {
        code: 'RC',
        name: 'Registro civil',
      }, {
        code: 'CC',
        name: 'Cédula de ciudadanía',
      },
      {
        code: 'CE',
        name: 'Cédula de extranjería',
      },
      {
        code: 'PB',
        name: 'Pasaporte',
      },
      {
        code: 'NIT',
        name: 'NIT',
      },
      {
        code: 'PA',
        name: 'Patrimonio autónomo',
      }]

    } else if (this.formF4.destino_inversion == 'IFAE') {
      this.selectDocR = [{
        code: 'TI',
        name: 'Tarjeta de identidad',
      }, {
        code: 'RC',
        name: 'Registro civil',
      }, {
        code: 'CC',
        name: 'Cédula de ciudadanía',
      },
      {
        code: 'CE',
        name: 'Cédula de extranjería',
      },
      {
        code: 'PB',
        name: 'Pasaporte',
      },
      {
        code: 'NIT',
        name: 'NIT',
      },
      {
        code: 'PA',
        name: 'Patrimonio autónomo',
      }]

    } else if (this.formF4.destino_inversion == 'INPF') {
      this.selectDocR = [{
        code: 'TI',
        name: 'Tarjeta de identidad',
      }, {
        code: 'RC',
        name: 'Registro civil',
      }, {
        code: 'CC',
        name: 'Cédula de ciudadanía',
      },
      {
        code: 'CE',
        name: 'Cédula de extranjería',
      },
      {
        code: 'PB',
        name: 'Pasaporte',
      },
      {
        code: 'PA',
        name: 'Patrimonio autónomo',
      },
      {
        code: 'NR',
        name: 'No residente',
      },
      {
        code: 'NIT',
        name: 'NIT',
      },
        ,
      {
        code: 'NDC',
        name: 'NO declarado',
      },]

    }

    else {
      this.selectDocR = [{
        code: 'TI',
        name: 'Tarjeta de identidad',
      }, {
        code: 'RC',
        name: 'Registro civil',
      }, {
        code: 'CC',
        name: 'Cédula de ciudadanía',
      },
      {
        code: 'CE',
        name: 'Cédula de extranjería',
      },
      {
        code: 'PB',
        name: 'Pasaporte',
      },
      {
        code: 'NIT',
        name: 'NIT',
      },
      {
        code: 'NR',
        name: 'NO residente',
      }, {
        code: 'PA',
        name: 'Patrimonio autónomo',
      }, {
        code: 'NDC',
        name: 'NO declarado',
      }
      ]
    }

  }
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
  
    // Validate required fields
    if (
      this.formF4.descripcionde_la_operacion.tasa_cambio_dolar !== '' && 
      this.formF4.descripcionde_la_operacion.valor_moneda_negociacion !== ''
    ) {
      const tasaDeCambio = this.formF4.descripcionde_la_operacion.tasa_cambio_dolar.toString();
      const vrTotal = this.formF4.descripcionde_la_operacion.valor_moneda_negociacion.toString();
      
      if (!isNaN(parseFloat(tasaDeCambio)) && !isNaN(parseFloat(vrTotal))) {
        const resultado = parseFloat(tasaDeCambio) * parseFloat(vrTotal);
        const decimalPlaces = resultado.toString().includes('.')
          ? resultado.toString().split('.')[1].length
          : 0;
        const fractionDigits = Math.min(decimalPlaces, 10);
        
        this.formF4.descripcionde_la_operacion.valor_total_dolares = resultado.toLocaleString('de-DE', {
          minimumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          maximumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          useGrouping: true,
        });
      } else {
        this.formF4.descripcionde_la_operacion.valor_total_dolares = '';
      }
    }
  
    // Calculate pesos if needed
    if (
      this.formF4.descripcionde_la_operacion.tasa_cambio_pesos !== '' &&
      this.formF4.descripcionde_la_operacion.valor_moneda_negociacion !== ''
    ) {
      const tasaDeCambio = this.formF4.descripcionde_la_operacion.tasa_cambio_pesos.toString();
      const vrTotal = this.formF4.descripcionde_la_operacion.valor_moneda_negociacion.toString();
      if (!isNaN(parseFloat(tasaDeCambio)) && !isNaN(parseFloat(vrTotal))) {
        const resultado = parseFloat(tasaDeCambio) * parseFloat(vrTotal);
        const decimalPlaces = resultado.toString().includes('.')
          ? resultado.toString().split('.')[1].length
          : 0;
        const fractionDigits = Math.min(decimalPlaces, 10);
        
        this.formF4.descripcionde_la_operacion.valor_total_pesos = resultado.toLocaleString('de-DE', {
          minimumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          maximumFractionDigits: fractionDigits < 4 ? fractionDigits : 4,
          useGrouping: true,
        });
      } else {
        this.formF4.descripcionde_la_operacion.valor_total_pesos = '';
      }
    }
  }
  async   getPaises() {
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
  async loadExcelFromCiiu() {
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
