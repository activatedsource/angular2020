import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ShoppingService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 1),
        new Ingredient('Tomatoes', 1),
    ];

    startedEditing = new Subject<number>();
    ingredientsChanged = new BehaviorSubject<Ingredient[]>(this.getIngrdients());

    constructor() {
        console.log('SERVICE - ShoppingService***');

    }

    getIngrdients() {
        return this.ingredients.slice();
    }

    getIngrdientByID(i: number) {
        return this.ingredients[i];
    }

    addIngredient(i: Ingredient) {
        // this.ingredients.push(i);
        // this.ingredientsChanged.emit(this.getIngrdients());
        this.addIngredientsCumulative([i]);
    }

    addIngredients(ingredients: Ingredient[]) {
        //this.ingredients.push(...ingredients);
        //this.ingredientsChanged.next(this.getIngrdients());
        this.addIngredientsCumulative(ingredients.slice());
    }

    addIngredientsCumulative(list: Ingredient[]) {
        const temp = [];
        let newItem = true;
        list.forEach((item) => {
            //console.log('NEW ' + item.name + ' / ' + item.amount);
            newItem = true;
            this.ingredients.forEach((i) => {
                // console.log('  STATE ' + i.name + ' / ' + i.amount);
                if (item.name === i.name) {
                    //   console.log('FOUND...' + (item === i));
                    newItem = false;
                    i.amount = i.amount + item.amount;
                }
            });
            if (newItem === true) {
                temp.push(item);
            }
        });
        //       console.log(temp);
        if (temp.length > 0) {
            //this.ingredients.push(...temp);
            temp.forEach((newIng: Ingredient) => { this.ingredients.push(JSON.parse(JSON.stringify(newIng))); });
        }
        this.ingredientsChanged.next(this.getIngrdients());
    }

    updateIngredient(i: number, item: Ingredient) {
        this.ingredients.splice(i, 1, item);
        this.ingredientsChanged.next(this.getIngrdients());
    }

    deleteIngredientByID(i: number) {
        this.ingredients.splice(i, 1);
        this.ingredientsChanged.next(this.getIngrdients());
    }


}

