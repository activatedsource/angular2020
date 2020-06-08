import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authSrv: AuthService) {
    console.log('SERVICE - AuthInterceptorService');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authSrv.user$
      .pipe(
        take(1),
        exhaustMap(
          (user) => {
            if (!user) {
              //console.log('SERVICE - AuthInterceptorService - User Null');
              return next.handle(req);
            }
            //console.log('SERVICE - AuthInterceptorService - Adding Token ', user.token);
            const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
            return next.handle(modifiedReq);
          }
        )
      );

  }

}