import { Injectable } from '@angular/core';
import { UserModel } from './api/models/userModel';
const CryptoJS = require("crypto-js");

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = 'CRED'
  private SECRET = 'testSecret'

  saveUser(user: UserModel): void {
    const data = CryptoJS.AES.encrypt(JSON.stringify(user), this.SECRET).toString()
    localStorage.setItem(this.USER_KEY, data);
  }

  getUser(): UserModel | undefined {
    const data = localStorage.getItem(this.USER_KEY);
    if (data){
      return JSON.parse(
        CryptoJS.AES.decrypt(data, this.SECRET).toString(CryptoJS.enc.Utf8)
      );
    }
    return undefined;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

}
