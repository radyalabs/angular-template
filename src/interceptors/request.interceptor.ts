import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_KEY } from '@/enums/key.enum';
import { CookieService } from '@/services/cookie.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedRequest = this.modifiedRequest(request);
    return next.handle(modifiedRequest);
  }

  modifiedRequest(request: HttpRequest<unknown>) {
    const modified = request.clone({
      setHeaders: {
        Authorization: this.cookieService.getCookies(APP_KEY.token),
      },
    });
    return modified;
  }
}
