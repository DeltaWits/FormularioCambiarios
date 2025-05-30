import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { tiposDocumentos } from 'src/app/utils/formsData';
import { exchangeRates } from 'src/app/utils/monedas';
import { numeralesCambiariosF1 } from '../../../../../../utils/formF1';
import { SharedModule } from 'src/app/shared.module';
import { ToolImgComponent } from "../../../../../../components/Modals/tool-img/tool-img.component";
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';

import * as introJs from 'intro.js';
@Component({
  selector: 'app-f1step3',
  standalone: true,

  imports: [FormsModule, ToolImgComponent, ReactiveFormsModule, SharedModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent, ToolImgComponent, dolarFormatPipe],
  templateUrl: './f1step3.component.html',
  styleUrl: './f1step3.component.scss'
})
export class F1step3Component implements OnInit {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF1: any = {
    descripcion_de_la_operacion: {
      numero_cambiario: '',
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio: '',
      valor_total_dolares: '',
    },
    informacion_DIAN: [{
      numero_o_factura: '',
      valor_FOB: ''
    }]
  }
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  submitInvalid = false
  numeralesCambiarios: any = numeralesCambiariosF1
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
    private router: Router,

    private elementRef: ElementRef,
  ) { }
  ngOnInit(): void {
    console.log("monedas", this.monedas)
    const storedValue = localStorage.getItem('tutorialActivate');


    if (storedValue == null) {

      setTimeout(() => {
        this.startTour();
      }, 500);
    }
    // this.startTour()
  }
  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {
      this.submitInvalid = false;
      this.formF1.steps.step1 = true
      this.formService.saveFormDataFId(this.formF1, this.formId, true);


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
  agregarDIAN() {
    this.formF1.informacion_DIAN.push({
      numero_o_factura: '',
      valor_FOB: ''
    })
  }
  deleteDIAN(index: number) {
    this.formF1.informacion_DIAN.splice(
      index,
      1,
    );
  }
  agregarImportador() {
    this.formF1.descripcion_de_la_operacion.push({
      numero_cambiario: '',
      cod_mda_negociacion: '',
      vr_total_mda_negociacion: '',
      tasa_de_cambio: '',
      valor_total_dolares: '',
    })
  }
  deleteImportador(index: number) {
    this.formF1.descripcion_de_la_operacion.splice(
      index,
      1,
    );
  }
  selectTasa(index: number) {
    const operacion = this.formF1.descripcion_de_la_operacion[index];

    if (
      operacion.tasa_de_cambio !== '' &&
      operacion.vr_total_mda_negociacion !== ''
    ) {
      // 1. Convertir tasa_de_cambio a número
      const tasaDeCambio = parseFloat(
        operacion.tasa_de_cambio.toString().replace(',', '.')
      );

      // 2. Limpiar y convertir valor de negociación a número
      const cleanValue = operacion.vr_total_mda_negociacion
        .replace(/\./g, '')   // eliminar separador de miles
        .replace(',', '.');   // cambiar coma decimal por punto

      const vrTotal = parseFloat(cleanValue);

      // 3. Si todo es válido, calcular y formatear
      if (!isNaN(tasaDeCambio) && !isNaN(vrTotal)) {
        const resultado = tasaDeCambio * vrTotal;

        // 4. Guardar con formato europeo (de-DE): "1.234,56"
        operacion.valor_total_dolares = resultado.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } else {
        operacion.valor_total_dolares = '';
      }
    }
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
        doneLabel: 'Terminar',

        // scrollToElement: false,

        steps: [
          {
            element: step1Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Esta es una ayuda para mas información, al darle click en ver nos saldrá una un modal con la información de cada numeral cambiario dependiendo del formulario</p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step2Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Con estos botones puedes agregar mas campos dependiendo del formulario</p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step3Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Una vez hayas terminado de ingresar toda la información necesaria, dale guardar y ya podrás descargar el pdf en la pagina principal </p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          { intro: "Ya estas listo para comenzar a crear tus formularios, ¡Buena suerte!" },


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
      this.router.navigate(['/forms']);

      localStorage.setItem('tutorialActivate', JSON.stringify(true));


    });
  }
}
