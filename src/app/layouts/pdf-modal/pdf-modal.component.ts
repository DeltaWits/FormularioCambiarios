import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { F1Component } from 'src/app/components/pdf/f1/f1.component';
import { F2Component } from 'src/app/components/pdf/f2/f2.component';
import { F3Component } from 'src/app/components/pdf/f3/f3.component';
import { IForm, IForms } from 'src/app/utils/formsData';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-pdf-modal',
  standalone: true,
  imports: [F1Component, F2Component, F3Component, NgIf],
  templateUrl: './pdf-modal.component.html',
  styleUrl: './pdf-modal.component.scss',
})
export class PdfModalComponent {

  @ViewChild('pagina1') pagina1!: ElementRef;
  @Input() status = false;
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
  @Output() changeModal = new EventEmitter<boolean>();

  fechaActual: Date = new Date();
  loader = false;
  closedModal() {
    this.changeModal.emit(false);
  }
  async downloadPDF() {
    this.loader = true;
    // this.formService.saveForm(this.form);
    // this.getFormData();
    const pdf = new jsPDF('p', 'px', [816, 1344]);
    const options = {
      margin: {
        top: 10,
        bottom: 10,
      },
    };
    const content = this.pagina1.nativeElement;
    const name = "formulario_cambiario" + this.form.tipo;
    // pdf.html(content, {
    //   callback: function () {
    //     pdf.save('Formulario_anexo_' + name);
    //   },
    //   autoPaging: 'text',

    //   margin: [0, 10, 0, 0],
    //   html2canvas: {
    //     scale: 1,
    //   },
    // });
    const addPageNumbers = (pdf: any) => {
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount - 1; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(`Pagina ${i} / ${pageCount - 1}`, pdf.internal.pageSize.getWidth() - 10, pdf.internal.pageSize.getHeight() - 10, {
          align: 'right'
        });
      }
    };
    await new Promise((resolve, reject) => {
      pdf.html(content, {
        callback: function () {
          addPageNumbers(pdf);
          pdf.save('Formulario_anexo_' + name);
          resolve(1);
        },
        autoPaging: 'text',
        margin: [0, 0, 0, 0],

        html2canvas: {
          scale: 1,
        },
      });
    });
    // ...
    this.loader = false;
  }
}
