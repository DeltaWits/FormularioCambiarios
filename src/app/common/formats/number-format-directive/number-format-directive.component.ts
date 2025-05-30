import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[dolarFormat][ngModel]',
})
export class dolarFormatDirectiveComponent {
  constructor(
    // private elementRef: ElementRef,
    private model: NgModel,
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Remover todos los caracteres que no sean dígitos
    const parsedValue = value.replace(/[^\d]/g, '');

    if (parsedValue === '') {
      this.model.valueAccessor!.writeValue('');
      this.model.viewToModelUpdate('');
      return;
    }

    // Formatear el número con separadores de miles
    const formattedValue = parseInt(parsedValue, 10).toLocaleString('de-DE');

    // Actualizar el valor mostrado en el input
    this.model.valueAccessor!.writeValue(formattedValue);

    // Actualizar el valor real en el modelo sin formatear
    this.model.viewToModelUpdate(formattedValue);
  }
}
