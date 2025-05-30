import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DolarFormatDirective } from './components/formats/formaDolar';

@NgModule({
  declarations: [DolarFormatDirective],
  imports: [CommonModule, FormsModule,],
  exports: [DolarFormatDirective]
})
export class SharedModule { }
