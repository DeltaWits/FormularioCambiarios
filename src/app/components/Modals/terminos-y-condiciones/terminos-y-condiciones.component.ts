import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { primaryButtons } from 'src/app/utils/colors';

@Component({
  selector: 'app-terminos-y-condiciones',
  standalone: true,
  imports: [],
  templateUrl: './terminos-y-condiciones.component.html',
  styleUrl: './terminos-y-condiciones.component.scss'
})
export class TerminosYCondicionesComponent {
  colorButtons = primaryButtons;
  constructor(private router: Router) { }
  deleteAll() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  acepTerms() {
    localStorage.setItem('termsandcodditions', 'true');

    window.location.reload();
  }
}
