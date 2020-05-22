import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeBlankComponent } from './recipe-detail/recipe-blank.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
        RecipeRoutingModule
    ],
    declarations: [
        RecipeComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeBlankComponent,
        RecipeEditComponent,
        RecipeListComponent
    ]
})
export class RecipeModule {

}
