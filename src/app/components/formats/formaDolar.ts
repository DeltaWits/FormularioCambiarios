import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[dolarFormat][ngModel]',
  standalone: true
})
export class DolarFormatDirective {
  constructor(
    private elementRef: ElementRef,
    private model: NgModel,
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (!value) {
      this.model.valueAccessor!.writeValue('');
      this.model.viewToModelUpdate('');
      return;
    }

    // Reemplazar coma por punto para soporte internacional
    let cleanedValue = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const decimalPoints = (cleanedValue.match(/\./g) || []).length;

    if (decimalPoints > 1) {
      // Evita múltiples puntos
      this.model.valueAccessor!.writeValue(this.model.model ?? '');
      return;
    }
    const decimalPlaces = cleanedValue.includes('.') 
    ? cleanedValue.split('.')[1].length 
    : 0;
    const fractionDigits = Math.min(decimalPlaces, 4);
    const [integerPart, decimalPart] = cleanedValue.split('.');
    if (decimalPart?.length > fractionDigits) {
      cleanedValue = `${integerPart}.${decimalPart.slice(0, fractionDigits)}`;
    }
    
    const num = parseFloat(cleanedValue);
    if (isNaN(num)) {
      this.model.valueAccessor!.writeValue(cleanedValue);
      this.model.viewToModelUpdate(cleanedValue);
      return;
    }

    this.model.valueAccessor!.writeValue(cleanedValue);
    this.model.viewToModelUpdate(num.toString());
  }

  @HostListener('blur')
  onBlur() {
    const rawValue = this.model.model;
    const num = parseFloat(rawValue);
    if (!isNaN(num)) {
      const decimalPlaces = rawValue.includes('.') 
        ? rawValue.split('.')[1].length 
        : 0;
        const fractionDigits = Math.min(decimalPlaces, 10);
      
      const formattedValue = num.toLocaleString('de-DE', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
        useGrouping: true,
      });
      this.model.valueAccessor!.writeValue(formattedValue);
    } else {
      this.model.valueAccessor!.writeValue('');
    }
  }


}
