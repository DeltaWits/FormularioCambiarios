import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { IForm, IForms } from '../utils/formsData';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() { }
  saveForm(code: string, empresa: string) {
    let formData = { code: code, empresa: empresa, forms: [] };
    const form = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('formsCambiarios', form);
  }
  saveUser(nombre: string, documento: string) {
    let formData = { nombre: nombre, documento: documento };
    const form = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('user', form);
  }
  saveFormData(formData: any) {
    const form = CryptoJS.AES.encrypt(
      JSON.stringify(formData),
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('formsCambiarios', form);
  }
  saveFormDataFId(formData: any, id: string, status?: boolean) {
    let form: IForms = this.getForm()
    let index = form.forms.findIndex((f: any) => f.id === id);
    form.forms[index].data = formData
    if (status == true) {
      form.forms[index].estado = 'resuelto'
    }
    const formSave = CryptoJS.AES.encrypt(
      JSON.stringify(form),
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('formsCambiarios', formSave);
  }
  getForm(): any | null {
    if (typeof localStorage !== 'undefined') {
      const forms: any = localStorage.getItem('formsCambiarios');
      if (forms) {
        try {
          const decrypted = CryptoJS.AES.decrypt(
            forms,
            environment.SECRET.trim()
          ).toString(CryptoJS.enc.Utf8);
          const data = JSON.parse(decrypted);
          console.log('data', data);
          return data;
        } catch (e) {
          console.error('Error decrypting token from localStorage', e);
          return false;
        }
      } else {
        return false;
      }
    }
    return null;
  }
  getUser(): any | null {
    if (typeof localStorage !== 'undefined') {
      const user: any = localStorage.getItem('user');
      if (user) {
        try {
          const decrypted = CryptoJS.AES.decrypt(
            user,
            environment.SECRET.trim()
          ).toString(CryptoJS.enc.Utf8);
          const data = JSON.parse(decrypted);
          console.log('data', data);
          return data;
        } catch (e) {
          console.error('Error decrypting token from localStorage', e);
          return false;
        }
      } else {
        return false;
      }
    }
    return null;
  }
}
