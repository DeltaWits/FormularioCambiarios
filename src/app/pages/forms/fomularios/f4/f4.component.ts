import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IFormF4 } from 'src/app/utils/formF4';
import { IForms } from 'src/app/utils/formsData';
import { monedasCasaDeBolsa, monedasCorfi } from 'src/app/utils/monedas';
import { F4step1Component } from "./steps/f4step1/f4step1.component";
import { F4step2Component } from "./steps/f4step2/f4step2.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-f4',
  standalone: true,
  imports: [F4step1Component, F4step2Component, NgIf],
  templateUrl: './f4.component.html',
  styleUrl: './f4.component.scss'
})
export class F4Component {
  formsD: IForms | any = {};
  stepNavigator = 1
  monedas: any = [];
  formID = ''
  formF4: IFormF4 = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_operacion: {
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
    destino_inversion: '',
    Identificacion_de_la_empresa_reseptora: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre: '',
      pais: '',
      correo: '',
      codigo_CIIU: '',
      telefono: '',
      direccion: '',
    },
    informacion_administrador_del_encargo: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre: '',

    },
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
      participantes: '',
      motivo_sin_participantes: ''

    },
    informacion_residente: {
      numeral_cambiario: '',
      naturaleza: '',
      tipo_empresa: '',
      es_vigilado_superintendencia: '',
      cual_superintendencia: '',
      sector: '',

    }
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

      this.formF4 = this.formsD.forms[index].data
    }
    console.log(this.formF4)
    if (this.formF4.identificacion_de_la_declaracion
      .fecha_tramite == '') {
      this.setFechaTramiteHoy()
      this.formF4.identificacion_de_la_declaracion.nit_imc = this.formsD.empresa == 'Corficolombiaba' ? '890300653' : '800203186';
      this.formF4.identificacion_de_la_declaracion.dv = this.formsD.empresa == 'Corficolombiaba' ? '6' : '5';

    }
  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF4.identificacion_de_la_declaracion.fecha_tramite = `${yyyy}-${mm}-${dd}`;
  }
}


