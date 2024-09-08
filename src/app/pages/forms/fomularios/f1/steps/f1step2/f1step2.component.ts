import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpAlertComponent } from 'src/app/components/Modals/pop-up-alert/pop-up-alert.component';
import { Tool1Component } from 'src/app/components/tooltips/tool1/tool1.component';
import { FormService } from 'src/app/services/form.service';
import { tiposDocumentos } from 'src/app/utils/formsData';

@Component({
  selector: 'app-f1step2',
  standalone: true,

  imports: [FormsModule, ReactiveFormsModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent],
  templateUrl: './f1step2.component.html',
  styleUrl: './f1step2.component.scss'
})
export class F1step2Component {
  @Input() monedas: any = [];
  @Input() formId = ''
  @Input() formF1: any = {
    identificacion_de_importador: {
      tipo_documento: '',
      numero_documento: '',
      dv: '',
      nombre_razon_social: ''
    }
  }
  // textTipoOperacion = textTipoOperacion
  @Output() step = new EventEmitter<string>();
  selectDocPN = tiposDocumentos;
  submitInvalid = false
  ShowPopUp = false;
  MessaggePopUp = {
    titulo: 'titulo',
    descripcion: 'texto explicativo',
    tipe: 'simple',
  };

  constructor(
    // private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) { }
  validateForm(step1Form: NgForm) {

    if (step1Form.valid) {
      this.submitInvalid = false;
      this.formF1.steps.step2 = true
      this.formService.saveFormDataFId(this.formF1, this.formId);
      this.step.emit('3');
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

  checkDvArray(inputNum: number) {
    // console.log("entro", this.formF1.identificacion_de_importador[inputNum].numero_documento)
    if (this.formF1.identificacion_de_importador[inputNum].numero_documento != '') {
      this.formF1.identificacion_de_importador[inputNum].dv = this.calculateDV(
        this.formF1.identificacion_de_importador[inputNum].numero_documento
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
  agregarImportador() {
    this.formF1.identificacion_de_importador.push({
      tipo_documento: '',
      numero_documento: '',
      dv: '',
      nombre_razon_social: ''
    })
  }
  deleteImportador(index: number) {
    this.formF1.identificacion_de_importador.splice(
      index,
      1,
    );
  }
}
