import { APP_KEY } from '@/enums/key.enum';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  public isLoggedIn(): boolean {
    return !!localStorage.getItem(APP_KEY.token);
  }

  logout() {
    return localStorage.clear();
  }

  getData$() {
    return this.get$('/users');
  }

  getData() {
    return this.get('/users');
  }
}
