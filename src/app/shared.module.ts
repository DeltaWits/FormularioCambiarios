import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DolarFormatDirective } from './components/formats/formaDolar';
import { OnlyalfanumericComponent } from './components/formats/onlyalfanumeric.component';

@NgModule({
  declarations: [OnlyalfanumericComponent],
  imports: [CommonModule, FormsModule,DolarFormatDirective],
  exports: [DolarFormatDirective, OnlyalfanumericComponent]
})
export class SharedModule { }
