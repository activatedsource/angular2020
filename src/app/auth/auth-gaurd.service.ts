import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGaurdService implements CanActivate {

    constructor(
        private authSrv: AuthService,
        private router: Router
    ) {
        console.log('SERVICE - AuthGaurdService');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.authSrv.user$.pipe(
            take(1),
            map((user) => {
                // console.log('GAURD', user);
                // console.log('route : ', route);
                // console.log('state : ', state.url);
                const iAuth = !!user;
                if (iAuth) {
                    return true;
                }
                return this.router.createUrlTree(['auth']);
            })
        );
    }

}
