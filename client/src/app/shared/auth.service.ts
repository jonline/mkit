import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

  storageKey: string = 'meenas-kitchen-jwt';
  token: string;

  constructor(
    private storage: Storage
  ) { }

  setToken (token: string) {
    this.storage.set(this.storageKey, token);
  }

  getToken () {
    return this.storage.get(this.storageKey);
  }

  isLoggedIn () {
    return this.getToken() !== null;
  }

  logout () {
    this.token = null;
    this.storage.remove(this.storageKey);
  }

}
