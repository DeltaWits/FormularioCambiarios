import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IFormF6 } from 'src/app/utils/formF6';
import { IForms } from 'src/app/utils/formsData';
import { monedasCasaDeBolsa, monedasCorfi } from 'src/app/utils/monedas';
import { F6step1Component } from "./steps/f6step1/f6step1.component";
import { F6step2Component } from "./steps/f6step2/f6step2.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-f6',
  standalone: true,
  imports: [F6step1Component, F6step2Component, NgIf],
  templateUrl: './f6.component.html',
  styleUrl: './f6.component.scss'
})
export class F6Component {
  formsD: IForms | any = {};
  stepNavigator = 1
  monedas: any = [];
  formID = ''
  formF6: IFormF6 = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_solicictud: {
      tipo: '',
      fecha_solicitud: '',
      numero_de_credito: ''
    },
    informacion_del_residente_deudor: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre_razon_social: '',
      codigo_cuidad: '',
      direccion: '',
      telefono: '',
      correo: '',
      codigo_CIIU: '',
    },
    informacion_del_acreedor: {
      tipo_identificacion: '',
      numero_identifiacion: '',
      nombre_razon_social: '',
      pais: '',
      tipo_presario_deudor: '',
      correo: '',
      codigo_CIIU: '',
    },
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
      numero_de_creaditos_sustituir: []
    },
    datos_del_deudor: {
      naturaleza: '',
      tipo_empresa: '',
      es_vigilado_superintendencia: '',
      cual_superintendencia: '',
      sector: ''
    },
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

      this.formF6 = this.formsD.forms[index].data
    }
    console.log(this.formF6)
    if (this.formF6.tipo_de_solicictud
      .fecha_solicitud == '') {
      this.setFechaTramiteHoy()

    }
  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF6.tipo_de_solicictud.fecha_solicitud = `${yyyy}-${mm}-${dd}`;
  }
}
