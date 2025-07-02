import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[onlyAlfaNums][ngModel]',
})
export class OnlyalfanumericComponent {
  constructor(
    private elementRef: ElementRef,
    private model: NgModel,
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Eliminar todo lo que no sea un número (0–9)
    const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, '');

    // Actualizar el valor mostrado en el input
    this.model.valueAccessor!.writeValue(alphanumericValue);

    // Actualizar el valor real en el modelo
    this.model.viewToModelUpdate(alphanumericValue);
  }
}
