import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorFormPageComponent } from 'src/app/components/error-form-page/error-form-page.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoaderFullPageComponent } from 'src/app/components/loader-full-page/loader-full-page.component';
import { ModalSelectFormComponent } from 'src/app/components/Modals/modal-select-form/modal-select-form.component';
import { NewFormComponent } from 'src/app/components/Modals/new-form/new-form.component';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { TerminosYCondicionesComponent } from 'src/app/components/Modals/terminos-y-condiciones/terminos-y-condiciones.component';
import { UserDataComponent } from 'src/app/components/Modals/user-data/user-data.component';
import { PdfModalComponent } from 'src/app/layouts/pdf-modal/pdf-modal.component';
import { FormService } from 'src/app/services/form.service';
import { formsData } from 'src/app/utils/formsData';

import * as introJs from 'intro.js';
@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgFor,
    NgIf,
    LoaderFullPageComponent,
    ModalSelectFormComponent,
    ErrorFormPageComponent,
    NewFormComponent,
    PdfModalComponent,
    UserDataComponent,
    PopUpAlertComponent,
    TerminosYCondicionesComponent,

  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements AfterViewInit {

  loader = false;
  formsD = formsData;
  showModalForms = false;
  showModalUserData = false
  showModalPDF = false;
  formModalData: any;
  addForm = false
  termsandcodditions: any = '';
  status: 'init' | 'process' | 'failed' | 'valid' | void = 'init';

  ShowPopUp = false;
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };
  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.getForm();
    // this.startTour();

  }
  async getForm() {
    this.formsD = this.formService.getForm();
    if (this.formsD != null) {
      this.loader = true;
      if (!this.formsD) {
        this.status = 'failed';
      } else {
        this.status = 'valid';
        this.termsandcodditions = localStorage.getItem('termsandcodditions');
        const storedValue = localStorage.getItem('tutorialActivate');

        if (this.termsandcodditions && storedValue == null) {
          if (this.formsD.forms.length == 0) {
            this.addForm = true;
            this.formsD.forms.push({
              id: '',
              tipo: '',
              data: '',
              fecha_create: '',
              estado: 'proceso'
            });
            this.cdr.detectChanges(); // Force change detection
          }
          setTimeout(() => {
            this.startTour();
          }, 500);
        }
      }
      this.cdr.detectChanges(); // Force change detection
    } else {
      this.formsD = {
        code: '',
        empresa: '',
        forms: []
      };
      this.cdr.detectChanges(); // Force change detection
    }
    console.log(this.formsD);
  }
  showActivePopUp(status: boolean) {
    this.ShowPopUp = status;
  }
  openModal(status: boolean) {
    this.showModalForms = status;
  }
  openModalUser(status: boolean) {
    this.showModalUserData = status
  }
  openModalPDF(status: boolean, form?: any) {
    console.log("ff", form)
    if (!status) {
      this.showModalPDF = status;
    } else {
      if (form?.estado == 'resuelto') {
        this.showModalPDF = status;
        if (form) {
          this.formModalData = form;
        } else {
          this.formModalData = [];
        }
      } else {
        this.showActivePopUp(true);

        this.MessaggePopUp.titulo = 'Alerta';
        this.MessaggePopUp.descripcion =
          'El formulario se encuentra en proceso, diligéncialo para poder descargarlo.';
        this.MessaggePopUp.tipe = 'alert';
      }
    }

  }
  onClickUpdateForm(id: string, tipo: string) {
    const ruta = '/form/' + tipo + '/' + id;

    this.router.navigateByUrl(ruta);
  }
  deleteForm(id: string) {
    const index = this.formsD.forms.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.formsD.forms.splice(index, 1);
    }
  }

  startTour() {

    const introJS = introJs.default();
    const step1Element = this.elementRef.nativeElement.querySelector('#step1');
    console.log(step1Element)
    const step2Element = this.elementRef.nativeElement.querySelector('#step2');
    const step3Element = this.elementRef.nativeElement.querySelector('#step3');
    const step4Element = this.elementRef.nativeElement.querySelector('#step4');
    const step5Element = this.elementRef.nativeElement.querySelector('#step5');
    const step6Element = this.elementRef.nativeElement.querySelector('#step6');
    if (step1Element) {

      console.log("entroT2")
      introJS.setOptions({
        tooltipClass: 'custom-intro-tooltip',
        nextLabel: 'Siguiente',
        prevLabel: 'Atrás',

        scrollTo: 'tooltip',
        doneLabel: 'Continuar',

        // scrollToElement: false,

        steps: [
          { intro: "Bienvenido a continuación se mostrara como crear los formularios" },
          {
            element: step1Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Al dar click se abrirá un popUp con una lista de los formularios a crear </p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step2Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>En esta tabla encuentras los formularios con sus estados</p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step3Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Editar formulario</p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step4Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Una vez terminado el formulario podrás descargarlo</p></div > ',
            position: 'top',
            tooltipClass: 'step3-tooltip',
          },
          {
            element: step5Element, // Selector del elemento que deseas resaltar en el tour
            intro:
              '<div  class="d-flex gap-2 flex-column justify-content-center align-items-center"> <p>Eliminar formulario</p></div > ',
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
      if (this.addForm) {
        this.formsD.forms.splice(
          0,
          1,
        );
      }
      if (introJS._currentStep !== introJS._introItems.length - 1) {
        localStorage.setItem('tutorialActivate', JSON.stringify(true));

      }

    });
    introJS.oncomplete(() => {
      if (this.addForm) {
        this.formsD.forms.splice(
          0,
          1,
        );
      }
      this.router.navigate(['/form/F1/prueba']);

      // localStorage.setItem('tutorialActivate', JSON.stringify(true));


    });
  }
}
