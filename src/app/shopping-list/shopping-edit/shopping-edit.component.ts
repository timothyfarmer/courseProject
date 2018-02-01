import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameElement: ElementRef;
  @ViewChild('amountInput') amountElement: ElementRef;
  ingredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;
  shoppingForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) { }
  ngOnInit() {
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, this.amountIsNumber])
    });
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemId = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.setValue({'name': this.editedItem.name, 'amount': this.editedItem.amount});
      }
    );
  }

  onSubmit() {
    const name = this.shoppingForm.get('name').value;
    const amount = this.shoppingForm.get('amount').value;
    this.ingredient = new Ingredient(name, amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(this.ingredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemId, this.ingredient);
    }
    this.onClear();

  }

  amountIsNumber(control: FormControl): {[s: string]: boolean} {
    if ( ! Number.isInteger(+control.value) || +control.value < 0) {
      console.log(control.value);
      return {'amountIsInvalid': true};
    } else {
      return null;
    }
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemId);
    }
    this.onClear();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
