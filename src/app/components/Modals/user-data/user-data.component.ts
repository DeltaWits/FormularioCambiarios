import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  @Input() showModal = true;

  @Output() showPopUpUser = new EventEmitter<boolean>();
  userData = {
    nombre: '',
    firma: ''
  }
  closedModal() {
    this.showPopUpUser.emit(false)
  }
}
