import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.message;
        } else {
          const { status } = error;
          errorMessage = error.message;

          if (status === HttpStatusCode.Unauthorized) {
            errorMessage = 'Unauthorized';
            this.handleUnauthorized();
          }
        }

        return throwError(() => {
          new Error(errorMessage);
        });
      })
    );
  }

  handleUnauthorized() {
    // navigate unauthorized to desired route such login page or etc
    this.router.navigateByUrl('/').then(() => {
      localStorage.clear();
    });
  }
}
