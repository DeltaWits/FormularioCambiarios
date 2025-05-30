import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolarFormat',
  standalone: true
})
export class dolarFormatPipe implements PipeTransform {
  transform(value: number | string, currency: string = '$'): string {
    if (!value) return '';
    
    // Convert to number if it's a string
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    // Format with 2 decimal places, thousand separator, and currency symbol
    return `${currency} ${num.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}
