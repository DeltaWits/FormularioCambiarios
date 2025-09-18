import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IForms } from 'src/app/utils/formsData';
import { monedasCasaDeBolsa, monedasCorfi } from 'src/app/utils/monedas';
import { F2step1Component } from './steps/f2step1/f2step1.component';
import { F2step2Component } from './steps/f2step2/f2step2.component';
import { F3step3Component } from '../f3/steps/f3step3/f3step3.component';
import { F2step3Component } from './steps/f2step3/f2step3.component';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-f2',
  standalone: true,
  imports: [NgFor, NgIf, F2step1Component, F2step2Component, F2step3Component, SharedModule],
  templateUrl: './f2.component.html',
  styleUrls: [
    './f2.component.scss',
    '../../form-layout/form-layout.component.scss',
  ],
})
export class F2Component implements OnInit {
  @Input() formsD: IForms | any = {};
  monedas: any = [];
  submitInvalid = true;
  stepNavigator = 1
  formF2 = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_operacion: '',
    tipo_de_moneda_operacion: '',
    identificacion_de_la_operacion: {
      fecha_tramite: '',
      nit_imc: '',
      dv: '',
      numero_declaracion: ''
    },
    identificacion_operacion_anterior: {
      fecha_operacion: '',
      nit_imc: '',
      dv: '',
      numero_deuda_externa: '',
      numero_declaracion_cambio: ''
    },
    declaracion_detalle: {
      devolucion: false,
      informacion_consolidada: false,
    },
    tipo_identidad: {
      otros: '',
      tipo: ''
    },
    identificacion_de_exportador: {
      tipo_documento: '',
      numero_documento: '',
      dv: '',
      nombre_razon_social: ''
    },
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

  formID = ''
  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formID = params['id']; // Obtiene el valor del parámetro 'muverID' de la URL
    });
    this.getForm();
    // this.formID = route.params.get('id');
    console.log(this.monedas, this.formsD.empresas);
  }
  changeStep(step: string) {
    this.stepNavigator = parseInt(step);
  }
  async getForm() {
    this.formsD = this.formService.getForm();
    this.monedas =
      this.formsD.empresa == 'corficolombiana'
        ? monedasCorfi
        : monedasCasaDeBolsa;
    let index = this.formsD.forms.findIndex((f: any) => f.id === this.formID);
    // console.log("objectdaaaa", index, this.formsD.forms[index].data)
    if (this.formsD.forms[index].data.steps) {

      this.formF2 = this.formsD.forms[index].data
    }
    if (this.formF2.identificacion_de_la_operacion
      .fecha_tramite == '') {
      this.setFechaTramiteHoy()
      this.formF2.identificacion_de_la_operacion.nit_imc = this.formsD.empresa == 'corficolombiana' ? '890300653' : '800203186';
      this.formF2.identificacion_de_la_operacion.dv = this.formsD.empresa == 'corficolombiana' ? '6' : '5';

    }
  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF2.identificacion_de_la_operacion.fecha_tramite = `${yyyy}-${mm}-${dd}`;
  }

}
