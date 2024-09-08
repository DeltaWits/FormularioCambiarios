import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoaderFullPageComponent } from 'src/app/components/loader-full-page/loader-full-page.component';
import { FormService } from 'src/app/services/form.service';
import { formsData } from 'src/app/utils/formsData';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RouterLink,
    LoaderFullPageComponent,
    NgIf,
  ],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss',
})
export class FormLayoutComponent implements OnInit {
  loader = false;
  formsD = formsData;

  status: 'init' | 'process' | 'failed' | 'valid' | void = 'init';
  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getForm();
  }
  async getForm() {
    this.formsD = this.formService.getForm();
    if (this.formsD != null) {
      setTimeout(() => {
        this.loader = true;
        if (!this.formsD) {
          this.status = 'failed';
        } else {
          this.status = 'valid';
        }
      }, 2000);
    }

    console.log(this.formsD);
  }
}
