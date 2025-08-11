import { Component, Input, OnInit } from '@angular/core';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { dolarFormatPipe } from 'src/app/pipes/currency-format.pipe';

@Component({
  selector: 'app-f7',
  standalone: true,
  imports: [HeaderComponent, NgFor, dolarFormatPipe, NgIf],
  templateUrl: './f7.component.html',
  styleUrl: './f7.component.scss'
})
export class F7Component implements OnInit {
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
    console.log(data)


  }
}

