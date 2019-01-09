import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const authorities = route.data['authorities'];

    return this.checkLogin(authorities, state).pipe(map(res => res));
  }

  checkLogin(authorities: string[], state: RouterStateSnapshot): Observable<boolean> {

    return this.authenticationService.identity().pipe(
      map(account => {

        if (!authorities || authorities.length === 0) {
          return true;
        }

        if (account) {
          if (this.authenticationService.hasAnyAuthority(authorities, account.role.name)) {
            return true;
          }
        }

        log.debug('Not authenticated, redirecting and adding redirect url...');
        this.router.navigate(['/access-denied'], { queryParams: { redirect: state.url }, replaceUrl: true });
        return false;
      })
    );
  }
}
