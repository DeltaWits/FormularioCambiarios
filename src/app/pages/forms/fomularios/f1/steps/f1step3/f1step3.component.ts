import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-f1step3',
  standalone: true,

  imports: [FormsModule, ToolImgComponent, ReactiveFormsModule, SharedModule, Tool1Component, NgIf, NgFor, PopUpAlertComponent, ToolImgComponent],
  templateUrl: './f1step3.component.html',
  styleUrl: './f1step3.component.scss'
})
export class F1step3Component {
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
    private router: Router
  ) { }

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
    // const currency = exchangeRates.find(rate => rate.code === this.formF1.descripcion_de_la_operacion[index].cod_mda_negociacion);
    // @ts-ignore:
    if (this.formF1.descripcion_de_la_operacion[index].tasa_de_cambio != '' && this.formF1.descripcion_de_la_operacion[index].vr_total_mda_negociacion != '') {
      const tasaDeCambio = this.formF1.descripcion_de_la_operacion[index].tasa_de_cambio;
      const vrTotalMdaNegociacion = this.formF1.descripcion_de_la_operacion[index].vr_total_mda_negociacion.replace(/[^\d]/g, '');
      // console.log("valorTM", vrTotalMdaNegociacion)
      this.formF1.descripcion_de_la_operacion[index].valor_total_dolares = parseFloat(
        (tasaDeCambio * vrTotalMdaNegociacion).toFixed(2)
      );
    }
  }
}
