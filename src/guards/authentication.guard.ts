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

import { AppKey } from '@/enums/key.enum';
import { getCookies } from '@/helpers/cookies.helper';
import { AuthenticationService } from '@/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentTime = new Date().getTime();
    const currentSession = Number(
      getCookies(AppKey.expiresIn),
    );

    return this.authService.isLoggedIn() && (currentTime < currentSession)
      ? true
      : this.unauthorizedHandler(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }

  unauthorizedHandler(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
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
