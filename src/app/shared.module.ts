import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberFormatDirectiveComponent } from './common/formats/number-format-directive/number-format-directive.component';

@NgModule({
  declarations: [NumberFormatDirectiveComponent],
  imports: [CommonModule, FormsModule,],
  exports: [NumberFormatDirectiveComponent]
})
export class SharedModule { }
