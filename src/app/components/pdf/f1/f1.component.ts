import { Component, Input, input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IForm } from 'src/app/utils/formsData';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './f1.component.html',
  styleUrl: './f1.component.scss',
})
export class F1Component {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
}
