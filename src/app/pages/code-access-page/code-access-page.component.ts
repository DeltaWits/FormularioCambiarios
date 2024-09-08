import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-code-access-page',
  standalone: true,
  imports: [FormsModule, NgIf, FooterComponent, HeaderComponent],
  templateUrl: './code-access-page.component.html',
  styleUrl: './code-access-page.component.scss',
})
export class CodeAccessPageComponent {
  code = '';

  ngForm = NgForm;
  submitInvalid = false;
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitInvalid = false;
      const ifCode = this.authService.checkCode(this.code);

      if (ifCode) {
        this.router.navigate(['']);
      } else {
        alert('Codigo incorrecto');
      }
    } else {
      this.submitInvalid = true;
    }
  }
}
