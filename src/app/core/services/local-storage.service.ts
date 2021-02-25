import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage: Storage;

  constructor(
    private cryptoService : CryptoService
  ) {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  getEncrypted(key: string, secret: string) : any {
    if (this.isLocalStorageSupported) {
      return this.cryptoService.decryptData(this.localStorage.getItem(key), secret);
    }
    return null;
  }

  setEncrypted(key: string, value: any, secret: string){
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, this.cryptoService.encryptData(value, secret));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
