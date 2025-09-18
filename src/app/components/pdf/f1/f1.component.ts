import { Component, Input, input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IForm } from 'src/app/utils/formsData';
import { NgFor, NgIf } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-f1',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf,dolarFormatPipe,DatePipe],
  templateUrl: './f1.component.html',
  styleUrl: './f1.component.scss',
})
export class F1Component implements OnInit {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
  usuario = {
    nombre: '',
    documento: ''
  }
  constructor(private formService: FormService) { }
  ngOnInit(): void {
    const data = this.formService.getUser()
    if (data) {
      this.usuario = data
    }
  }
}
