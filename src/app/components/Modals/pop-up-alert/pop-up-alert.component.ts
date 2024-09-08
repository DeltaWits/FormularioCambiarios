import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-alert',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-alert.component.html',
  styleUrl: './pop-up-alert.component.scss'
})
export class PopUpAlertComponent implements OnInit {
  // @Input() showPopUp = false;
  @Input() Messagge = {
    titulo: '',
    descripcion: '',
    tipe: '',
  };

  @Output() showPopUp = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    // this.showPopUp = false;
    this.showPopUp.emit(false);
  }
}
