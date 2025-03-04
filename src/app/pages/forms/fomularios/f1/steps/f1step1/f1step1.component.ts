import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { textTipoOperacion, textTipoIdentidad } from '../../textosF1';
import { NgFor, NgIf } from '@angular/common';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { IFormF1 } from 'src/app/utils/formF1';

import * as introJs from 'intro.js';
@Component({
  selector: 'app-f1step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent],
  templateUrl: './f1step1.component.html',
  styleUrl: './f1step1.component.scss'
})
export class F1step1Component implements OnInit {
  @Input() monedas: any = [];
  selectDocPN = tiposDocumentos;
  @Input() formId = ''

  textTipoOperacion = textTipoOperacion
  textTipoIdentidad = textTipoIdentidad
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  @Input() formF1: IFormF1 | any = {
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
  }
  ShowPopUp = false;
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };
  switchState: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router,

    private elementRef: ElementRef,
  ) { }
  ngOnInit(): void {
    console.log("monedas", this.monedas)
    const storedValue = localStorage.getItem('tutorialActivate' || null);


    if (storedValue == null) {

      setTimeout(() => {
        this.startTour();
      }, 500);
    }
    // this.startTour()
  }
  onSwitchChange(num: number) {
    if (num == 1) {
    }
    console.log('Switch State:', this.switchState);
    this.switchState = !this.switchState
  }
  checkDv1(inputNum: number) {
    if (

      inputNum == 1
    ) {
      this.formF1.identificacion_de_la_operacion.dv = this.calculateDV(
        this.formF1.identificacion_de_la_operacion.nit_imc
      );
    } else if (
      inputNum == 2
    ) {
      this.formF1.identificacion_operacion_anterior.dv = this.calculateDV(
        this.formF1.identificacion_operacion_anterior.nit_imc
      );
    } else if (
      inputNum == 3
    ) {
      this.formF1.identificacion_de_importador.dv = this.calculateDV(
        this.formF1.identificacion_de_importador.numero_documento
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
      this.formF1.steps.step1 = true
      this.formService.saveFormDataFId(this.formF1, this.formId);
      this.step.emit('2');
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

  startTour() {

    const introJS = introJs.default();
    const step1Element = this.elementRef.nativeElement.querySelector('#step1');
    // console.log(step1Element)
    const step2Element = this.elementRef.nativeElement.querySelector('#step2');
    const step3Element = this.elementRef.nativeElement.querySelector('#step3');
    if (step1Element) {

      introJS.setOptions({
        tooltipClass: 'custom-intro-tooltip',
        nextLabel: 'Siguiente',
        prevLabel: 'Atrás',

        scrollTo: 'tooltip',
        doneLabel: 'Continuar',

        // scrollToElement: false,

        steps: [
          { intro: "Cada formulario es diferente pero con una estructura similar " },
          {
            element: step1Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Recuerda llenar los campos correspondientes, trata de empezar siempre por tipo de operación  </p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step2Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Si ves estos signos (?), al pasar el mouse por encima de ellos nos saldrá un texto de ayuda </p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step3Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Una vez hayas completado los campos necesarios no olvides darle continuar para guardar tus datos </p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },


          // {
          //   element: step6Element, // Selector del elemento que deseas resaltar en el tour
          //   intro:
          //     '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Cuando todos los formularios este resueltos, podrá descargar un excel con toda la información de estos</p></div > ',
          //   position: 'top',
          //   tooltipClass: 'step3-tooltip',
          // },
          // {
          //   element: step2Element, // Selector del elemento que deseas resaltar en el tour
          //   intro:
          //     '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center">  <p>Aquí podrás ver el las insignias completadas y pendientes del Muver.</p></div>',
          //   position: 'right',
          //   tooltipClass: 'step3-tooltip',
          // },


          // Agrega más pasos según lo necesites
        ],
      });
    }
    introJS.start();

    introJS.onexit(() => {

      if (introJS._currentStep !== introJS._introItems.length - 1) {
        localStorage.setItem('tutorialActivate', JSON.stringify(true));

        this.router.navigate(['/forms']);
      }

    });
    introJS.oncomplete(() => {
      this.step.emit('2');
      // this.router.navigate(['/forms']);

      // localStorage.setItem('tutorialActivate', JSON.stringify(true));


    });
  }
}
