import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
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
          Error(errorMessage);
        });
      }),
    );
  }

  handleUnauthorized() {
    // navigate unauthorized to desired route such login page or etc
    this.router.navigateByUrl('/').then(() => {
      localStorage.clear();
    });
  }
}
