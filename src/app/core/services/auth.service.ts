import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { DataStoreService } from './data-store.service';

@Injectable()
export class AuthService {

    WEB_API_KEY = 'AIzaSyB884MJ4TGHCQ_H6y8_iutGSvo3njqZWh8';
    user$ = new BehaviorSubject<User>(null);
    authenticatedUser: User;
    showLogoutWarning$ = new BehaviorSubject<{ show: boolean, time: number }>({ show: false, time: 0 });

    constructor(
        private http: HttpClient,
        private router: Router,
        private dataStoreSrv: DataStoreService
    ) {
        console.log('SERVICE - AuthService***');
    }

    signUp(request: AuthRequest) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.WEB_API_KEY;
        return this.http.post<AuthResponse>(url, request)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            );
    }

    login(request: AuthRequest) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.WEB_API_KEY;
        return this.http.post<AuthResponse>(url, request)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            );
    }

    handleAuthentication(response: AuthResponse) {
        console.log('handleAuthentication :: ', response);
        if (response) {
            //const expiration = new Date(new Date().getTime() + (+response.expiresIn * 1000));
            const expiration = new Date(new Date().getTime() + (600 * 1000));

            const USER_JSON = {
                EMAIL: response.email,
                USERID: response.localId,
                TOKEN: response.idToken,
                EXPIRATION: expiration.getTime(),
            };
            localStorage.setItem('USER_DATA', JSON.stringify(USER_JSON));
            const user = new User(response.email, response.localId, response.idToken, expiration);
            this.initApp(user);
        }
    }

    initApp(user: User) {
        if (user) {
            console.log('SERVICE - AuthService : initApp ***');
            this.user$.next(user);
            this.setSessiontTimer(user);
            //this.showLogoutWarning$.next(false);
            this.dataStoreSrv.fetchDataStore();
            this.router.navigate(['recipe']);
        }
    }

    setSessiontTimer(user: User) {
        let timerTime = user.tokenExpiration.getTime() - new Date().getTime();
        console.log('timerTime :: ' + timerTime);
        const stdWarningTime = (20 * 1000);
        let warningTime = 0;
        if (timerTime > stdWarningTime) {
            timerTime = timerTime - stdWarningTime;
            warningTime = stdWarningTime;
        } else {
            warningTime = timerTime;
            timerTime = 0;
        }
        const warningTimeSeconds: number = Math.ceil(warningTime / 1000);
        // console.log('timerTime (' + timerTime + ') waring duration(' + warningTime + ')' + warningTimeSeconds);
        setTimeout(() => {
            // console.warn(' ***** WARNING  -  AUTO LOGOUT *****');
            this.showLogoutWarning$.next({ show: true, time: warningTimeSeconds });
        }, timerTime);
    }


    autoLogin() {
        const lsJSON = localStorage.getItem('USER_DATA');

        //console.log('TYPE : ', (typeof lsJSON));
        //console.log('VALUE : ', lsJSON);
        if (typeof lsJSON === 'string' && (lsJSON === 'undefined' || lsJSON === '' || lsJSON === 'null')) {
            return;
        }
        if (typeof lsJSON === 'object' && lsJSON === null) {
            return;
        }
        const lsUser: any = JSON.parse(lsJSON);
        //console.log('LS', lsUser);

        if (lsUser && lsUser.EMAIL && lsUser.USERID && lsUser.TOKEN && lsUser.EXPIRATION) {
            //console.log(' AUTO - LOGING . . . ', lsUser);
            const user: User = new User(lsUser.EMAIL, lsUser.USERID, lsUser.TOKEN, new Date(lsUser.EXPIRATION));
            if (user.token) {
                this.initApp(user);
            } else {
                console.log('LocalStorage TOKEN already Expired');
                this.logout(true);
            }
        }
    }

    handleError(errorResponse: HttpErrorResponse) {
        let errorMsg = 'Error occured';
        console.log('handleError :: ', errorResponse);
        if (errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS': {
                    errorMsg = `The email address is already in use by another account`;
                    break;
                }
                case 'OPERATION_NOT_ALLOWED': {
                    errorMsg = `Password sign-in is disabled for this project.`;
                    break;
                }
                case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
                    errorMsg = `We have blocked all requests from this device due to unusual activity. Try again later.`;
                    break;
                }
                case 'EMAIL_NOT_FOUND': {
                    errorMsg = `There is no user record corresponding to this identifier. The user may have been deleted.`;
                    break;
                }
                case 'INVALID_PASSWORD': {
                    errorMsg = `The password is invalid or the user does not have a password.`;
                    break;
                }
                case 'USER_DISABLED': {
                    errorMsg = `The user account has been disabled by an administrator.`;
                    break;
                }
            }
        }
        return throwError(errorMsg);
    }

    logout(auto: boolean = false) {
        console.log(' LOGING OUT . . . ' + auto);
        this.user$.next(null);
        localStorage.removeItem('USER_DATA');
        if (auto) {
            this.showLogoutWarning$.next({ show: false, time: 0 });
        }
        this.router.navigate(['auth']);
    }




}

export class AuthRequest {
    email: string;
    password: string;
    returnSecureToken = true;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

export class AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
