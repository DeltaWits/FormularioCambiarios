import { Component, Input, OnInit } from '@angular/core';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';

@Component({
  selector: 'app-f2',
  standalone: true,
  imports: [HeaderComponent, NgFor, dolarFormatPipe ],
  templateUrl: './f2.component.html',
  styleUrl: './f2.component.scss'
})
export class F2Component implements OnInit {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
  usuario = {
    nombre: '' ,
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

