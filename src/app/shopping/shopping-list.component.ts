import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingService } from '../core/services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientsChangedSubscription: Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    // this.ingredients = this.shoppingService.getIngrdients();
    this.ingredientsChangedSubscription = this.shoppingService.ingredientsChanged
      .subscribe(
        (value: Ingredient[]) => {
          // console.log(' SL ' + value);
          this.ingredients = value;
        }
      );
  }

  itemEdit(i) {
    this.shoppingService.startedEditing.next(i);
  }

  ngOnDestroy() {
    // console.log('SL: Destroy');
    this.ingredientsChangedSubscription.unsubscribe();
  }

}
