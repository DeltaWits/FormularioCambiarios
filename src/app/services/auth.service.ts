import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  randomCode: string = '';
  checkCode(code: string) {
    if (code == environment.CODE_ACCESS) {
      this.saveToken(code);
      return true;
    } else {
      return false;
    }
  }
  saveToken(code: string) {
    const token = CryptoJS.AES.encrypt(
      code,
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('token', token);
  }
  saveUsercode() {
    let fechaActual = new Date().getTime();
    // fechaExpiracion.setDate(fechaActual.getDate() + 2);
    let fechaExpiracion = new Date(fechaActual + 30 * 86400000).getTime();
    const data = {
      code: this.generateRandomCode(8),
      dateExpire: fechaExpiracion,
    };
    const userCode = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.SECRET.trim()
    ).toString();
    localStorage.setItem('user-code', userCode);
    return data.code;
  }

  getCode(): boolean | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decrypted = CryptoJS.AES.decrypt(
            token,
            environment.SECRET.trim()
          ).toString(CryptoJS.enc.Utf8);
          if (decrypted === environment.CODE_ACCESS) {
            return true;
          } else {
            return false;
          }
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
  validUserCode(codeId?: any) {
    let fechaActual = new Date().getTime();
    let data = {
      email: '',
      code: '',
      dateExpire: '',
    };
    const userCode: any = localStorage.getItem('user-code');
    if (userCode) {
      const code = CryptoJS.AES.decrypt(
        userCode,
        environment.SECRET.trim()
      ).toString(CryptoJS.enc.Utf8);
      data = JSON.parse(code);
      //@ts-ignore
      if (data.dateExpire > fechaActual) {
        let fecha = new Date(data.dateExpire);
        let fecha2 = new Date(fechaActual);

        if (codeId) {
          if (data.code == codeId) {
            return data;
          }
          return false;
        }
        return true;
      } else {
        //@ts-ignore
        let fecha = new Date(data.dateExpire);
        let fecha2 = new Date(fechaActual);

        this.removeUserCode();
        return false;
      }
    } else {
      return false;
    }
  }
  getUserCodeExist() {
    const userCode: any = localStorage.getItem('user-code');
    if (userCode) {
      return this.validUserCode();
    }
    return false;
  }
  setCode() {
    let data = {
      email: '',
      code: '',
    };
    const userCode: any = localStorage.getItem('user-code');
    if (userCode) {
      const code = CryptoJS.AES.decrypt(
        userCode,
        environment.SECRET.trim()
      ).toString(CryptoJS.enc.Utf8);
      data = JSON.parse(code);

      return data;
    } else {
      return false;
    }
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  removeUserCode() {
    localStorage.removeItem('user-code');
    localStorage.removeItem('termsandcodditions');
    localStorage.removeItem('form');
    localStorage.removeItem('socios');
  }

  generateRandomCode(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
