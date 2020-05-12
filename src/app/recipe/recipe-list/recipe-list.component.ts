import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../shared/model/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  serachValue = '';
  constructor(
    private recipeSrevice: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.recipeSrevice.recipesStream$
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  selected(recipe: Recipe) {
    this.recipeSrevice.selectRecipe(recipe);
    const i = this.recipes.findIndex(r => r.name === recipe.name);
    this.router.navigate(['recipe', i]);
  }
}
