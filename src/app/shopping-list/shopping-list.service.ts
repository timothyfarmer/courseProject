import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {forEach} from '@angular/router/src/utils/collection';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log('emitted');
  }

  addIngredients(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.ingredients.push(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
