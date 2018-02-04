import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


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
  editedItem: Ingredient;
  shoppingForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientId > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.shoppingForm.setValue({'name': this.editedItem.name, 'amount': this.editedItem.amount});
          } else {
            this.editMode = false;
          }
        }
      );
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, this.amountIsNumber])
    });
    // this.subscription = this.shoppingListService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemId = index;
    //     console.log('edited id = ' + index);
    //     this.editMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.shoppingForm.setValue({'name': this.editedItem.name, 'amount': this.editedItem.amount});
    //   }
    // );
  }

  onSubmit() {
    const name = this.shoppingForm.get('name').value;
    const amount = this.shoppingForm.get('amount').value;
    this.ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: this.ingredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(this.ingredient));
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
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
    this.onClear();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
