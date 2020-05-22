import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/model/recipe.model';
import { RecipeService } from '../../core/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  @Input() recipe: Recipe;
  selectedRecipe: Recipe;
  private selectedRecipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.selectedRecipeSubscription = this.recipeService.selectedRecipe$.subscribe((r: Recipe) => { this.selectedRecipe = r; });

  }

  ngOnDestroy() {
    this.selectedRecipeSubscription.unsubscribe();
  }

}
