import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SessionAlertComponent } from './auth/alert/session-alert.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { DataStoreService } from './auth/data-store.service';
import { AuthGaurdService } from './auth/auth-gaurd.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SessionAlertComponent,
  ],
  providers: [
    AuthService,
    DataStoreService,
    AuthGaurdService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [SessionAlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
