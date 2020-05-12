import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/model/recipe.model';
import { ShoppingService } from 'src/app/shopping/shopping.service';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  recipeID: number;
  constructor(
    private shoppingService: ShoppingService,
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((p: Params) => {
      this.recipeID = p.id;
      //console.log('>>' + this.recipeID);
      this.recipe = this.recipeService.getRecipeById(this.recipeID);
      //console.log('>>>' + this.recipe);
    });
  }

  addToShoopingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeService.getSelectedRecipeId());
  }

}
