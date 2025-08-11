import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DolarFormatDirective } from './components/formats/formaDolar';
import { OnlyalfanumericComponent } from './components/formats/onlyalfanumeric.component';
import { EmailDomainValidatorDirective } from './components/formats/emailvalidator';
import { OnlyNumbersComponent } from './components/formats/onlyNums';

@NgModule({
  declarations: [OnlyalfanumericComponent, EmailDomainValidatorDirective ,OnlyNumbersComponent],
  imports: [CommonModule, FormsModule,DolarFormatDirective],
  exports: [DolarFormatDirective, OnlyalfanumericComponent, OnlyNumbersComponent, EmailDomainValidatorDirective]
})
export class SharedModule { }
