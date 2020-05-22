import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../shared/model/recipe.model';
import { RecipeService } from '../core/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  private selectedRecipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.selectedRecipeSubscription = this.recipeService.selectedRecipe$
      .subscribe((r: Recipe) => {
        this.selectedRecipe = r;
      });
  }

  ngOnDestroy() {
    this.selectedRecipeSubscription.unsubscribe();
  }

}
