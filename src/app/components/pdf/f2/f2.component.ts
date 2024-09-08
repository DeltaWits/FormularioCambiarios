import { Component, Input } from '@angular/core';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-f2',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './f2.component.html',
  styleUrl: './f2.component.scss'
})
export class F2Component {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
}

