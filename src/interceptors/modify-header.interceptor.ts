import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppKey } from '@/enums/key.enum';
import { getCookies } from '@/helpers/cookies.helper';

@Injectable()
export class ModifyHeaderInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: getCookies(AppKey.token),
      },
    });
    return next.handle(modifiedRequest);
  }
}
