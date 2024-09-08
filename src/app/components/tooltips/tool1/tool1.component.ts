import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool1',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tool1.component.html',
  styleUrl: './tool1.component.scss'
})
export class Tool1Component {
  @Input() content = 'prueba'
  isVisible: boolean = false;

  showTooltip() {
    this.isVisible = true;
  }

  hideTooltip() {
    this.isVisible = false;
  }
}
