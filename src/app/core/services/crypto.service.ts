import { Injectable } from '@angular/core';
import { UserAuth } from '@user/models/user.auth';
import CryptoES from 'crypto-es';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
   
  encryptData(data : UserAuth, secret: string) {
    try {
      return CryptoES.AES.encrypt(
        JSON.stringify(data),
        secret
      ).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data : string, secret: string) {
    try {
      const bytes = CryptoES.AES.decrypt(data, secret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoES.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
