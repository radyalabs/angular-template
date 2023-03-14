import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_KEY } from '@/enums/key.enum';
import { LoginParams, LoginResponse } from '@/modules/login/login.interface';
import { BaseResponse } from '@/types/base-response.types';
import { BaseService } from './base.service';
import { AppInjector } from '@/app.module';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  cookieService = AppInjector.get(CookieService);

  public isLoggedIn(): boolean {
    return (
      !!localStorage.getItem(APP_KEY.token) ||
      !!this.cookieService.getCookies(APP_KEY.token)
    );
  }

  login(body: LoginParams): Observable<BaseResponse<LoginResponse>> {
    return this.post$<LoginResponse>('/api/auth/login', body, {
      culture: 'id-ID',
    });
  }

  logout() {
    return this.cookieService.deleteCookies([APP_KEY.token, APP_KEY.expiresIn]);
  }

  getData$() {
    return this.get$('/users');
  }

  getData() {
    return this.get('/users');
  }
}
