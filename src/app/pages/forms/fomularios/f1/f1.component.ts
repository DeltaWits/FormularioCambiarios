import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { monedasCasaDeBolsa, monedasCorfi } from '../../../../utils/monedas';
import { IForms, tiposDocumentos } from 'src/app/utils/formsData';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { textTipoOperacion } from './textosF1';
import { F1step1Component } from './steps/f1step1/f1step1.component';
import { F1step2Component } from './steps/f1step2/f1step2.component';
import { F1step3Component } from './steps/f1step3/f1step3.component';
import { IFormF1 } from 'src/app/utils/formF1';
@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, Tool1Component, F1step1Component, F1step2Component, F1step3Component],
  templateUrl: './f1.component.html',
  styleUrls: [
    './f1.component.scss',
    '../../form-layout/form-layout.component.scss',
  ],
})
export class F1Component implements OnInit {
  @Input() formsD: IForms | any = {};
  monedas: any = [];
  submitInvalid = true;
  stepNavigator = 1
  formF1: IFormF1 = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_operacion: '',
    // tipo_de_moneda_operacion: '',
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
    identificacion_de_importador: {
      tipo_documento: '',
      numero_documento: '',
      dv: '',
      nombre_razon_social: ''
    },
    descripcion_de_la_operacion: [{
      numero_cambiario: '',
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio: '',
      valor_total_dolares: '',
    }],
    informacion_DIAN: [{
      numero_o_factura: '',
      valor_FOB: ''
    }]

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

      this.formF1 = this.formsD.forms[index].data
    }
    if (this.formF1.identificacion_de_la_operacion
      .fecha_tramite == '') {
      this.setFechaTramiteHoy()
      this.formF1.identificacion_de_la_operacion.nit_imc = this.formsD.empresa == 'Corficolombiaba' ? '890300653' : '800203186';
      this.formF1.identificacion_de_la_operacion.dv = this.formsD.empresa == 'Corficolombiaba' ? '6' : '5';

    }

  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF1.identificacion_de_la_operacion.fecha_tramite = `${yyyy}-${mm}-${dd}`;
  }
}
