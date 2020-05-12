import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthRequest, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm;

  loginMode = true;
  processing = false;
  errorMsg = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  switchMode() {
    this.loginMode = !this.loginMode;
    this.reset();
  }

  reset() {
    this.authForm.reset();
    this.errorMsg = null;
  }

  authFormSubmit(form: NgForm) {
    //console.log(form.value);
    if (form.valid) {
      const request = new AuthRequest(form.value.email, form.value.password);
      this.processing = true;
      let authObervable$: Observable<any>;
      if (this.loginMode) {
        authObervable$ = this.authService.login(request);
      } else {
        authObervable$ = this.authService.signUp(request);
      }
      authObervable$.subscribe(
        (response: AuthResponse) => {
          //console.log('AUTH :: ', response);
          this.processing = false;
        },
        (errorMsg) => {
          //console.log('ERROR :: ', errorMsg);
          this.processing = false;
          this.errorMsg = errorMsg;
        }
      );
    }
  }

  checkForm(form: NgForm) {
    //console.log(form);
  }



}
