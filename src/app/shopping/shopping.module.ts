import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent }
        ])
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ]
})
export class ShoppingModule {

}
