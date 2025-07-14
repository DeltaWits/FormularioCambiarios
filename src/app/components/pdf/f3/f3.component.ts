import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';

@Component({
  selector: 'app-f3',
  standalone: true,

  imports: [HeaderComponent, NgFor, dolarFormatPipe],
  templateUrl: './f3.component.html',
  styleUrl: './f3.component.scss'
})
export class F3Component implements OnInit {
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
