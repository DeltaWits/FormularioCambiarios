import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root',
})
export class PdfService {

  // private apiUrl = 'formCambiarios/api/generate-pdf';
  private apiUrl = './api/generate-pdf';

  constructor() { }

  async sendHtml(htmlContent: string): Promise<Blob> {
    try {
      const response = await axios.post(
        this.apiUrl,
        { htmlContent },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      if (!response.data || !(response.data instanceof Blob)) {
        throw new Error('La respuesta de la API no es un Blob válido.');
      }

      console.log('✅ Se generó el PDF correctamente en el servidor');
      return response.data;
    } catch (error) {
      console.error('❌ Error al generar el PDF:', error);
      throw error;
    }
  }
}
