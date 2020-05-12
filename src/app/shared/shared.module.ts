import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListFilterPipe } from './list-filter.pipe';
import { PlaceholderDirective } from './placeholder.directive';
import { TruncateTextPipe } from './truncate-text.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ListFilterPipe,
        PlaceholderDirective,
        TruncateTextPipe,
        LoadingSpinnerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ListFilterPipe,
        PlaceholderDirective,
        TruncateTextPipe,
        LoadingSpinnerComponent

    ]
})
export class SharedModule {

}
