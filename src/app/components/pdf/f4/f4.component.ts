import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';

@Component({
  selector: 'app-f4',
  standalone: true,

  imports: [HeaderComponent, NgFor,dolarFormatPipe,NgIf],
  templateUrl: './f4.component.html',
  styleUrl: './f4.component.scss'
})
export class F4Component implements OnInit {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
  usuario = {
    nombre: '',
    documento: '',
  }
  constructor(private formService: FormService) { }
  ngOnInit(): void {
    const data = this.formService.getUser()
    if (data) {
      this.usuario = data
    }
  }
}
