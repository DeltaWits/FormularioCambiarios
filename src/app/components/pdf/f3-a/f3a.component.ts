import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-f3a',
  standalone: true,

  imports: [HeaderComponent, NgFor,dolarFormatPipe,DatePipe],
  templateUrl: './f3a.component.html',
  styleUrl: './f3a.component.scss'
})  
export class F3aComponent implements OnInit {
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
