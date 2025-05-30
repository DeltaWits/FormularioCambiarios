import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[dolarFormat][ngModel]',
})
export class DolarFormatDirective {
  constructor(
    private elementRef: ElementRef,
    private model: NgModel,
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Limpiar el valor, permitiendo solo números y punto decimal
    let cleanedValue = value.replace(/[^0-9.]/g, '');

    // Verificar si hay un punto decimal
    const decimalPoints = (cleanedValue.match(/\./g) || []).length;

    // Si no hay punto decimal
    if (decimalPoints === 0) {
      // Permitir cualquier número
      this.model.valueAccessor!.writeValue(cleanedValue);
      this.model.viewToModelUpdate(cleanedValue);
      return;
    }

    // Si hay un punto decimal
    if (decimalPoints === 1) {
      // Dividir la parte entera y decimal
      const [integerPart, decimalPart] = cleanedValue.split('.');
      
      // Si la parte decimal tiene más de 2 dígitos, limitar a 2
      if (decimalPart && decimalPart.length > 2) {
        cleanedValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
      }
    }

    // Si hay más de un punto decimal, mantener el valor anterior
    if (decimalPoints > 1) {
      cleanedValue = this.model.model;
    }

    // Intentar convertir a número
    const num = parseFloat(cleanedValue);
    if (isNaN(num)) {
      // Si el número aún no es válido, permitir el valor actual
      this.model.valueAccessor!.writeValue(cleanedValue);
      this.model.viewToModelUpdate(cleanedValue);
      return;
    }

    // Mostrar el valor sin formato mientras se escribe
    this.model.valueAccessor!.writeValue(cleanedValue);
    
    // Pasar el valor "limpio" al modelo (sin formato)
    this.model.viewToModelUpdate(num.toString());
  }

  @HostListener('blur')
  onBlur() {
    // Cuando se pierde el foco, formatear con separadores de miles y 2 decimales
    if (this.model.model) {
      const num = parseFloat(this.model.model);
      if (!isNaN(num)) {
        const formattedValue = num.toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: true
        });
        this.model.valueAccessor!.writeValue(formattedValue);
      }
    }
  }
}
