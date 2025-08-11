import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IFormF5 } from 'src/app/utils/formF5';
import { IForms } from 'src/app/utils/formsData';
import { monedasCasaDeBolsa, monedasCorfi } from 'src/app/utils/monedas';
import { F5step1Component } from "./steps/f5step1/f5step1.component";
import { F5step2Component } from "./steps/f5step2/f5step2.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-f5',
  standalone: true,
  imports: [F5step2Component, F5step1Component, NgIf],
  templateUrl: './f5.component.html',
  styleUrl: './f5.component.scss'
})
export class F5Component implements OnInit {
  formsD: IForms | any = {};
  monedas: any = [];
  submitInvalid = true;
  stepNavigator = 1
  formF5: IFormF5 = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_operacion: {
      tipo: '',
      ingreso_o_egreso: '',
    },
    // tipo_de_moneda_operacion: '',
    identificacion_de_la_declaracion: {

      fecha_tramine: '',
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
    identificacion_de_la_empresa: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre: '',
      dv: '',
      telefono: '',
      direccion: '',
      ciudad: ''
    },

    descripcion_de_la_operacion: {
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio_dolar: '',
      valor_total_dolares: 0,
    },
    informacion_de_la_operacion: [{
      numero_cambiario: '',
      valor_total_dolares: '',
    }],
    observaciones: '',
    valor_total_operaciones: 0

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

      this.formF5 = this.formsD.forms[index].data
    }
    if (this.formF5.identificacion_de_la_declaracion
      .fecha_tramine == '') {
      this.setFechaTramiteHoy()
      this.formF5.identificacion_de_la_declaracion.nit_imc = this.formsD.empresa == 'corficolombiana' ? '890300653' : '800203186';
      this.formF5.identificacion_de_la_declaracion.dv = this.formsD.empresa == 'corficolombiana' ? '6' : '5';

    }

  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF5.identificacion_de_la_declaracion.fecha_tramine = `${yyyy}-${mm}-${dd}`;
  }
}
