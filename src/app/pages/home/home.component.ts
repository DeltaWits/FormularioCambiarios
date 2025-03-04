import { AfterViewInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  email: any = '';
  loader = true;
  ngForm = NgForm;
  submitInvalid = false;
  // status: 'init' | 'process' | 'failed' | 'submit' | void | 'valid' = 'init';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.ValidCode();
  }

  ValidCode() {
    const dataCode = this.authService.getUserCodeExist();

    if (dataCode != false) {
      const ruta = '/forms';

      this.router.navigateByUrl(ruta);
    }
    // else {
    //   this.status = 'init';
    //   const code = this.authService.saveUsercode(this.email);
    //   const ruta = 'form';
    //   this.router.navigateByUrl(ruta);
    //   setTimeout(() => {
    //     this.loader = false;
    //   }, 1000);
    // }
  }
  login(imc: 'corficolombiana' | 'casa de bolsa') {
    const code = this.authService.saveUsercode();
    this.formService.saveForm(code, imc);
    const ruta = '/forms';

    this.router.navigateByUrl(ruta);
  }
  resetForm() {
    this.authService.removeUserCode();
  }
}
