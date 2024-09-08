import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { monedasCasaDeBolsa, monedasCorfi } from '../../../../utils/monedas';
import { IForms, tiposDocumentos } from 'src/app/utils/formsData';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { IFormF3A } from 'src/app/utils/formF3A';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { SharedModule } from 'src/app/shared.module';
import { textTipoOperacion } from './textosF3A';
import { numeralesCambiariosF3 } from 'src/app/utils/formF3';
@Component({
  selector: 'app-f3-a',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, SharedModule, PopUpAlertComponent, NgIf, NgFor],

  templateUrl: './f3-a.component.html',
  styleUrl: './f3-a.component.scss',
})
export class F3AComponent implements OnInit {
  formsD: IForms | any = {};
  stepNavigator = 1
  monedas: any = [];
  formID = ''
  formF3A: IFormF3A = {
    steps: {
      step1: false,
      step2: false,
      step3: false,
    },
    tipo_de_operacion: {
      tipo: 'Inicial',
      ingreso_o_egreso: '',
      fecha_presentacion: ''
    },
    identificacion_del_informe: {
      fecha_tramite: '',
      nit_imc: '',
      dv: '',
      numero_declaracion: ''
    },


    descripcion_de_la_operacion: {
      numero_prestamo_aval: '',
      tipo_identificacion: '',
      numero_identificacion: '',
      dv: '',
      nombre_deudor: '',
      nombre_acreedor: '',
      codigo_moneda: '',
      valor_total_moneda: '',

      valor_total_dolares: '',
    },
    razon_por_no_desembolso_o_no_genero_declaracion: {
      Codigo_y_descripcion: ''
    },

    informacion_de_numerales: [{
      numeral_cambiario: '',
      valor_total_moneda: '',
      valor_dolares: '',
    }],

  }
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };
  submitInvalid = false

  selectDocPN = tiposDocumentos;
  textTipoOperacion = textTipoOperacion
  ShowPopUp = false;

  numeralesCambiarios: any = numeralesCambiariosF3
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

      this.formF3A = this.formsD.forms[index].data
    }
    console.log(this.formF3A)
    if (this.formF3A.identificacion_del_informe
      .fecha_tramite == '') {
      this.setFechaTramiteHoy()
      this.formF3A.identificacion_del_informe.nit_imc = this.formsD.empresa == 'Corficolombiaba' ? '890300653' : '800203186';
      this.formF3A.identificacion_del_informe.dv = this.formsD.empresa == 'Corficolombiaba' ? '6' : '5';

    }
  }

  setFechaTramiteHoy(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.formF3A.identificacion_del_informe.fecha_tramite = `${yyyy}-${mm}-${dd}`;
  }

  checkDv1(inputNum: number) {
    if (

      inputNum == 1
    ) {



      this.formF3A.identificacion_del_informe.dv = this.calculateDV(

        this.formF3A.identificacion_del_informe.nit_imc
      );
    } else if (
      inputNum == 3
    ) {
      this.formF3A.descripcion_de_la_operacion.dv = this.calculateDV(
        this.formF3A.descripcion_de_la_operacion.numero_identificacion
      );
    }
  }
  calculateDV(numNit: any) {
    var vpri, x, y, z;
    let stringNit = numNit.toString();
    // Se limpia el Nit
    // numNit = numNit.replace(/\s/g, ''); // Espacios
    // numNit = numNit.replace(/,/g, ''); // Comas
    // numNit = numNit.replace(/\./g, ''); // Puntos
    // numNit = numNit.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(numNit)) {
      alert("El nit/cédula '" + numNit + "' no es válido(a).");
      return '';
    }

    // Procedimiento
    vpri = new Array(16);
    z = stringNit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (var i = 0; i < z; i++) {
      y = stringNit.substr(i, 1);
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;

      x += y * vpri[z - i];
      // console.log ( x ) ;
    }

    y = x % 11;
    console.log(y);

    return (y > 1 ? 11 - y : y).toString();
  }
  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {
      this.submitInvalid = false;
      this.formService.saveFormDataFId(this.formF3A, this.formID, true);


      this.router.navigateByUrl('/forms');

    } else {
      console.log("entro", step1Form.valid)
      this.submitInvalid = true;

      this.MessaggePopUp.titulo = 'Alerta';
      this.MessaggePopUp.descripcion =
        'Hay campos sin diligenciar, verificar para continuar. *Los campos faltantes se muestran en rojo.';
      this.MessaggePopUp.tipe = 'alert';

      this.showActivePopUp(true);
      // @ts-ignore: Desactivar comprobaciones de TypeScript para esta sección
    }
  }
  showActivePopUp(status: boolean) {
    this.ShowPopUp = status;
  }
  agregarInfo() {
    this.formF3A.informacion_de_numerales.push({
      numeral_cambiario: '',
      valor_total_moneda: '',
      valor_dolares: '',
    })
  }
  deleteInfo(index: number) {
    this.formF3A.informacion_de_numerales.splice(
      index,
      1,
    );
  }
}
