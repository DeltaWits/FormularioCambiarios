import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeDrow = false;
  usuario: any;
  @Input() empresa = '';

  @Output() showPopUpUser = new EventEmitter<boolean>();

  toggleDrowActive() {
    this.activeDrow = !this.activeDrow;
  }
  goMyPerfil() {

    this.toggleDrowActive();
  }
  openUser() {
    this.showPopUpUser.emit(true)

    this.toggleDrowActive();
  }
}
