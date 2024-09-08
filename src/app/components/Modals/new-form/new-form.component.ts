import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.scss',
})
export class NewFormComponent {
  constructor(private router: Router) { }
  newForm() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  descargarPDF() {
    const rutaPDF = 'assets/pdf/intruciones.pdf'; // Ruta relativa al archivo PDF dentro de la carpeta "assets"
    const link = document.createElement('a');
    link.href = rutaPDF;
    link.download = 'Instructivo.pdf'; // Nombre del archivo de descarga
    link.click();
    URL.revokeObjectURL(rutaPDF);
  }
}
