import { Component, Input } from '@angular/core';
import { F3step1Component } from './steps/f3step1/f3step1.component';
import { F3step2Component } from './steps/f3step2/f3step2.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IForms } from 'src/app/utils/formsData';

import { monedasCasaDeBolsa, monedasCorfi } from 'src/app/utils/monedas';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-f3',
  standalone: true,
  imports: [F3step1Component, F3step2Component, NgIf],
  templateUrl: './f3.component.html',
  styleUrl: './f3.component.scss'
})
export class F3Component {
  @Input() formsD: IForms | any = {};
  stepNavigator = 1
  monedas: any = [];
  formID = ''
  formF3: any = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    }, tipo_de_operacion: {
      tipo: '',
      ingreso_o_egreso: '',
      devolucion: ''
    },
    identificacion_de_la_declaracion: {
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
    detalle_del_credito: {
      numero_prestamo: '',
      tipo_identificacion: '',
      numero_identificacion: '',
      dv: '',
      nombre_deudor: '',
      nombre_acreedor: '',

    },
    detalle_de_la_declaracion: {
      codigo_moneda: '',
      valor_total_moneda: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: '',
      tasa_cambio_moneda_negociacion: '',

      valor_moneda_stipulada: '',
    },
    informacion_de_numerales: [{
      codigo_moneda: '',
      valor_total_moneda: '',
      valor_dolares: '',
      valor_moneda_stipulada: '',
    }],
  }
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
  changeStep(step: any) {
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

      this.formF3 = this.formsD.forms[index].data
    }
    console.log(this.formF3)
    if (this.formF3.identificacion_de_la_declaracion
      .fecha_tramite == '') {
      this.setFechaTramiteHoy()
      this.formF3.identificacion_de_la_declaracion.nit_imc = this.formsD.empresa == 'Corficolombiaba' ? '890300653' : '800203186';
      this.formF3.identificacion_de_la_declaracion.dv = this.formsD.empresa == 'Corficolombiaba' ? '6' : '5';

    }
  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF3.identificacion_de_la_declaracion.fecha_tramite = `${yyyy}-${mm}-${dd}`;
  }
}
