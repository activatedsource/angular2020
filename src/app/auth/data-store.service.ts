import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../shared/model/recipe.model';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataStoreService {

    baseUrl = 'https://angular2020-04.firebaseio.com';

    dataStoreRecipe$ = new BehaviorSubject<Recipe[]>(null);

    constructor(
        private http: HttpClient,
    ) {
        console.log('SERVICE - DataStore***');
    }

    saveDataStore() {
        // const recipes = this.recipeSrv.getRecipes();
        // this.http.put((this.baseUrl + '/recipes.json'), recipes)
        //     .subscribe(
        //         (response) => {
        //             console.log(' SAVE : ', response);
        //         });
    }

    fetchDataStore() {
        //{ params: new HttpParams().set('auth', user.token) }
        console.log('SERVICE - DataStore - fetchDataStore()');
        this.http.get<Recipe[]>((this.baseUrl + '/recipes.json')
        ).subscribe(
            (recipes: Recipe[]) => {
                console.log(' FETCH : ', recipes);
                //this.recipeSrv.initRecipeStream(recipes);
                this.dataStoreRecipe$.next(recipes);
            });
    }




}
