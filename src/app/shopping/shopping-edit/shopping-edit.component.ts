import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;
  @ViewChild('form', { static: false }) formObj: NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.sub = this.shoppingService.startedEditing.subscribe((i) => {
      // console.log('SE - Init: ' + i);
      // console.log(i);
      this.editedItemIndex = i;
      this.editMode = true;
      this.editedIngredient = this.shoppingService.getIngrdientByID(this.editedItemIndex);
      this.formObj.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  onSubmit() {
    // console.log(this.formObj.value);
    const indredient = new Ingredient(this.formObj.value.name, this.formObj.value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, indredient);
    } else {
      this.shoppingService.addIngredient(indredient);
    }
    this.editMode = false;
    this.clearForm();
  }

  clearForm() {
    this.editMode = false;
    this.formObj.reset();
  }

  deleteItem() {
    //console.log('DELETE: ' + this.editedItemIndex);
    this.shoppingService.deleteIngredientByID(this.editedItemIndex);
    this.editMode = false;
    this.formObj.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getLabel(mode) {
    return mode ? 'Update' : 'Add';
  }

}
