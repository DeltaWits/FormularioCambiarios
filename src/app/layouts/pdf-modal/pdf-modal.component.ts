import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { F1Component } from 'src/app/components/pdf/f1/f1.component';
import { F2Component } from 'src/app/components/pdf/f2/f2.component';
import { F3Component } from 'src/app/components/pdf/f3/f3.component';
import { IForm, IForms } from 'src/app/utils/formsData';
import jsPDF from 'jspdf';
import { FormService } from '../../services/form.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { F3aComponent } from "src/app/components/pdf/f3-a/f3a.component";
import { F4Component } from "src/app/components/pdf/f4/f4.component";
import { F5Component } from "src/app/components/pdf/f5/f5.component";
import { F6Component } from "src/app/components/pdf/f6/f6.component";
import { F7Component } from "src/app/components/pdf/f7/f7.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, F1Component, F2Component, F3Component, NgIf, F3aComponent, F4Component, F5Component, F6Component, F7Component],
  templateUrl: './pdf-modal.component.html',
  styleUrl: './pdf-modal.component.scss',
})
export class PdfModalComponent implements OnInit {

  @ViewChild('pagina1') pagina1!: ElementRef;
  @Input() status = false;
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    empresa: '',
    fecha_create: '',
    estado: 'proceso',
  };
  @Output() changeModal = new EventEmitter<boolean>();
  submitInvalid = false
  usuario = {
    nombre: '',
    documento: ''
  }
  empresa = ''
  existuser = false
  fechaActual: Date = new Date();
  loader = false;
  loader2 = false;
  constructor(private formService: FormService, private pdfService: PdfService) {

    
  }
  ngOnInit(): void {
    const data = this.formService.getUser()
    if (data) {
      this.usuario = data
      this.existuser = true
    }
    const forms = this.formService.getForm()
    if (forms) {
      this.empresa = forms.empresa
    }
  }
  closedModal() {
    this.changeModal.emit(false);
  }

  validateForm(step1Form: NgForm) {
    console.log(this.form)
    if (step1Form.valid ) {
      this.loader2 = true
      this.submitInvalid = false;
      this.formService.saveUser(this.usuario.nombre, this.usuario.documento);
      this.existuser = true
      setTimeout(() => {
        this.loader2 = false
      }, 500);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
      });

      this.submitInvalid = true;
    }
  }

  async sendHtmlToApi() {
    this.loader = true;
    if (!this.pagina1 || !this.pagina1.nativeElement) {
      console.error('❌ No se encontró el elemento HTML.');
      return;
    }

    const htmlContent = this.pagina1.nativeElement.innerHTML; // 🔹 Cambio de outerHTML a innerHTML
    console.log('📄 HTML que se enviará:', htmlContent);

    try {
      const pdfBlob = await this.pdfService.sendHtml(htmlContent); // 🟢 Recibe el PDF como Blob

      if (!pdfBlob || !(pdfBlob instanceof Blob)) {
        this.loader = false;
        throw new Error('La API no devolvió un Blob válido.');
      }

      console.log('✅ HTML enviado correctamente');
      // 🔹 Obtener el tipo de formulario para el nombre del archivo
      const formType = this.form?.tipo || 'Desconocido';
      const fileName = `FormularioCambiarios_${formType}.pdf`;

      // 🔹 FORZAR DESCARGA DEL PDF
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.loader = false;
      // 🔹 Liberar memoria
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      this.loader = false;
      console.error('❌ Error enviando el HTML:', error);
    }
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
