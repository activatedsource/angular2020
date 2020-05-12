import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../shared/model/recipe.model';
import { DataStoreService } from '../auth/data-store.service';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];
    private selectedRecipe: Recipe;
    selectedRecipe$ = new BehaviorSubject<Recipe>(null);
    recipesStream$ = new BehaviorSubject<Recipe[]>([]);

    constructor(private ds: DataStoreService) {
        console.log('SERVICE - RecipeService***');
        ds.dataStoreRecipe$.subscribe((recipes: Recipe[]) => {
            if (recipes) {
                this.initRecipeStream(recipes);
            }
        })
    }

    initRecipeStream(recipes: Recipe[]) {
        this.recipes = recipes;
        this.refreshRecipesStream();
    }

    refreshRecipesStream() {
        this.recipesStream$.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        const r: Recipe = this.recipes[id];
        return r;
    }

    selectRecipe(r: Recipe) {
        this.selectedRecipe = r;
        this.selectedRecipe$.next(this.selectedRecipe);
    }

    getSelectedRecipeId() {
        if (this.selectedRecipe) {
            return this.recipes.findIndex(r => r.name === this.selectedRecipe.name);
        }
        return -1;
    }

    addRecipe(recipe: Recipe) {
        if (recipe) {
            if (!recipe.ingredients) {
                recipe.ingredients = [];
            }
            this.recipes.push(recipe);
            this.refreshRecipesStream();
        }
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.refreshRecipesStream();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.refreshRecipesStream();
    }


}
