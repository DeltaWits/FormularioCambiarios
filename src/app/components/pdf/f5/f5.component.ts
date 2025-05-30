import { Component, Input, OnInit } from '@angular/core';
import { IForm } from 'src/app/utils/formsData';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-f5',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './f5.component.html',
  styleUrl: './f5.component.scss'
})
export class F5Component implements OnInit {
  @Input() form: IForm = {
    id: '',
    tipo: '',
    data: {},
    fecha_create: '',
    estado: 'proceso',
  };
  usuario = {
    nombre: ''
  }
  constructor(private formService: FormService) { }
  ngOnInit(): void {
    const data = this.formService.getUser()
    if (data) {
      this.usuario = data
    }
  }
}

