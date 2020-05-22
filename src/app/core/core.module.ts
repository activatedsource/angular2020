import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { DataStoreService } from './services/data-store.service';
import { RecipeService } from './services/recipe.service';
import { ShoppingService } from './services/shopping.service';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { SessionAlertComponent } from './components/session-alert/session-alert.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [
        HeaderComponent,
        AuthComponent,
        SessionAlertComponent
    ],
    exports: [
        HeaderComponent,
        AuthComponent,
        SessionAlertComponent
    ],
    providers: [
        AuthService,
        DataStoreService,
        RecipeService,
        ShoppingService,
        AuthGaurdService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    entryComponents: [SessionAlertComponent]
})
export class CoreModule {

    constructor(@SkipSelf() @Optional() private parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core Module should only be imported in roort module');
        }
    }

}
