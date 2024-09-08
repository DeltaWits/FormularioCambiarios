import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IForms } from 'src/app/utils/formsData';
import { FormService } from '../../../services/form.service';
import moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-select-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './modal-select-form.component.html',
  styleUrl: './modal-select-form.component.scss',
})
export class ModalSelectFormComponent implements OnInit {
  @Input() status = false;
  @Input() formsD: IForms | any;
  fechaActual = new Date().getTime();
  @Output() changeModal = new EventEmitter<boolean>();
  fechaFormateada: string = '';
  submitInvalid = true;

  addForm: FormGroup;
  constructor(private formService: FormService, private router: Router) {
    this.addForm = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
    });
  }
  uniqueId: string = '';

  ngOnInit() {
    //
    // Marca de tiempo en milisegundos

    this.uniqueId = this.generateUniqueId();
  }
  closedModal() {
    this.changeModal.emit(false);
  }
  async validateForm() {
    this.submitInvalid = this.addForm.valid;
    if (this.addForm.valid) {
      this.getDate();
      this.formsD.forms.push({
        id: this.uniqueId,
        tipo: this.addForm.value.tipo,
        data: {},
        fecha_create: this.fechaFormateada,
        estado: 'proceso',
      });
      this.formService.saveFormData(this.formsD);
      const ruta = '/form/' + this.addForm.value.tipo + '/' + this.uniqueId;

      this.router.navigateByUrl(ruta);
      this.closedModal();
    }
  }
  getDate() {
    const timestampMs = new Date().getTime();

    // Configura Moment.js para usar español
    moment.updateLocale('es', {
      months: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthsShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      weekdays: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm',
      },
    });

    // Convierte y formatea la fecha
    this.fechaFormateada = moment(timestampMs).format(
      'dddd, D [de] MMMM [de] YYYY HH:mm:ss'
    );
  }
  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(36); // Base 36 encoding of timestamp
    const randomSuffix = Math.random().toString(36).substr(2, 9); // Random alphanumeric string
    return `${timestamp}-${randomSuffix} `;
  }
}
