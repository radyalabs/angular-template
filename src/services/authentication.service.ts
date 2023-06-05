import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppKey } from '@/enums/key.enum';
import { deleteCookies, getCookies } from '@/helpers/cookies.helper';
import { LoginResponse } from '@/modules/login/login.interfaces';
import { LoginParams } from '@/modules/login/login.types';

import BaseService from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  isLoggedIn(): boolean {
    return !!getCookies(AppKey.accessToken);
  }

  login(body: LoginParams): Observable<LoginResponse> {
    return this.post$<LoginResponse>('/api/identity/sign-in', body, undefined, false);
  }

  logout() {
    const keyToDelete = [AppKey.accessToken, AppKey.refreshToken, AppKey.userId, AppKey.expiresIn];
    deleteCookies(keyToDelete);
  }

  getData$() {
    return this.get$('/users');
  }

  getData() {
    return this.get('/users');
  }

  checkSession(): boolean {
    const accessToken = getCookies(AppKey.accessToken);
    const refreshToken = getCookies(AppKey.refreshToken);
    const userId = getCookies(AppKey.userId);

    const currentTime = new Date().getTime();
    const currentSession = Number(
      getCookies(AppKey.expiresIn),
    );

    return (!!accessToken && !!refreshToken && !!userId) && currentTime <= currentSession;
  }
}
