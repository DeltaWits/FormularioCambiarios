import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[onlyNumbers][ngModel]',
})
export class OnlyNumbersComponent {
  constructor(
    private elementRef: ElementRef,
    private model: NgModel,
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Eliminar todo lo que no sea un número (0–9)
    const numericValue = value.replace(/[^0-9]/g, '');

    // Actualizar el valor mostrado en el input
    this.model.valueAccessor!.writeValue(numericValue);

    // Actualizar el valor real en el modelo
    this.model.viewToModelUpdate(numericValue);
  }
}
