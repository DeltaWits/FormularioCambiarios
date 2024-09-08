import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-img',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './tool-img.component.html',
  styleUrl: './tool-img.component.scss'
})
export class ToolImgComponent {
  showModal = false
  @Input() numerales = [{ codigo: '', texto: '' }]

}
