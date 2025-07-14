import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolarFormat',
  standalone: true
})
export class dolarFormatPipe implements PipeTransform {
  transform(value: number | string, currency: string = '$'): string {
    if (!value) return '';
    
    // Convertir a string
    let strValue = value.toString();
    
    // Limpiar el valor: 
    // 1. Eliminar todos los caracteres que no sean números, punto o coma
    strValue = strValue.replace(/[^0-9.,]/g, ''); // Eliminar caracteres no numéricos
    
    // Si hay más de una coma, mantener solo la última (la que marca los decimales)
    const parts = strValue.split(',');
    strValue = parts[0] + (parts.length > 1 ? ',' + parts[1] : '');
    
    // Eliminar puntos (que son separadores de miles)
    strValue = strValue.replace(/\./g, '');
    
    // Convertir a número
    const num = parseFloat(strValue.replace(',', '.'));
    
    // Si el número es válido
    if (!isNaN(num)) {
      // Formatear con coma como separador decimal y punto como separador de miles
      return `${currency} ${num.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      })}`;
    }
    
    // Si el valor no es un número válido, devolver el valor original
    return `${currency} ${value}`;
  }
}
