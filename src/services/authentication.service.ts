import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppKey } from '@/enums/key.enum';
import { deleteCookies, getCookies } from '@/helpers/cookies.helper';
import { LoginResponse } from '@/modules/login/login.interfaces';
import { LoginParams } from '@/modules/login/login.types';
import { BaseResponse } from '@/types/base-response.types';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  isLoggedIn(): boolean {
    return !!getCookies(AppKey.token);
  }

  login(body: LoginParams): Observable<LoginResponse> {
    return this.post$<LoginResponse>('/api/auth/login', body, {
      culture: 'id-ID',
    });
  }

  logout() {
    return deleteCookies([AppKey.token, AppKey.expiresIn]);
  }

  getData$() {
    return this.get$('/users');
  }

  getData() {
    return this.get('/users');
  }
}
