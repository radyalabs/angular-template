import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@/services/storage.service';
import { APP_KEY } from '@/enums/key.enum';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

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
        Authorization: `Bearer ${this.storageService.getKeys(APP_KEY.token)}`,
      },
    });
    return modified;
  }
}
