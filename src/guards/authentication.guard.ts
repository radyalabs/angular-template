import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/services/authentication.service';
import { APP_KEY } from '@/enums/key.enum';
import { CookieService } from '@/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn() && this.checkSession()
      ? true
      : this.unauthorizedHandler(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }

  checkSession(): boolean {
    const currentTime = new Date().getTime();
    const currentSession = Number(
      this.cookieService.getCookies(APP_KEY.expiresIn)
    );

    return currentTime < currentSession;
  }

  unauthorizedHandler(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const params = {
      redirectTo: state.url,
    };
    this.router.navigate(['/login'], { queryParams: params }).then(() => {
      alert('Please login');
      localStorage.clear();
    });

    return false;
  }
}
