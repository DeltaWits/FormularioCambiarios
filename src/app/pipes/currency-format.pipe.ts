import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolarFormat',
  standalone: true
})
export class dolarFormatPipe implements PipeTransform {
  transform(value: number | string, currency: string = ''): string {
    if (value === null || value === undefined || value === '') return '';
    
    // Si el valor ya es un número, usarlo directamente
    if (typeof value === 'number') {
      return this.formatNumber(value, currency);
    }
    
    // Convertir a string y limpiar espacios
    let strValue = value.toString().trim();
    console.log(strValue)

    
    // Manejar números con punto como separador de miles y coma como decimal
    if (strValue.includes('.')) {
      // Si tiene un solo punto y no tiene comas
      if ((strValue.match(/\./g) || []).length === 1 && !strValue.includes(',')) {
        // Si el punto está seguido de exactamente 3 dígitos, asumir que es separador de miles (1.476)
        if (/\.\d{3}$/.test(strValue)) {
          const cleanValue = strValue.replace(/\./g, '');
          const num = parseFloat(cleanValue);
          if (!isNaN(num)) {
            return this.formatNumber(num, currency);
          }
        }
        // Si el punto está seguido de 1 o 2 dígitos, asumir que es separador decimal (1.47 o 1.4)
        else if (/\.\d{1,2}$/.test(strValue)) {
          const num = parseFloat(strValue);
          if (!isNaN(num)) {
            return this.formatNumber(num, currency);
          }
        }
      } 
      // Si tiene múltiples puntos, asumir que son separadores de miles
      else if ((strValue.match(/\./g) || []).length > 1) {
        const cleanValue = strValue.replace(/\./g, '');
        const num = parseFloat(cleanValue);
        if (!isNaN(num)) {
          return this.formatNumber(num, currency);
        }
      }
    }
    
    // Manejar números con coma como separador decimal
    if (strValue.includes(',')) {
      // Reemplazar comas por punto para el parseo
      const cleanValue = strValue.replace(/\./g, '').replace(',', '.');
      const num = parseFloat(cleanValue);
      if (!isNaN(num)) {
        return this.formatNumber(num, currency);
      }
    }
    
    // Si no coincide con ningún patrón, intentar convertir directamente
    const cleanValue = strValue.replace(/\./g, '');
    const num = parseFloat(cleanValue);
    if (!isNaN(num)) {
      return this.formatNumber(num, currency);
    }
    
    // Si no se pudo convertir, devolver el valor original
    return currency ? `${currency} ${value}` : value.toString();
  }
  
  private formatNumber(num: number, currency: string): string {
    const formatted = num.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
    return currency ? `${currency} ${formatted}` : formatted;
  }
}
