import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientId: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientId: -1
};


export function shoppingListReducer(state = initialState, action: ShoppingListActions
  .ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };


      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[state.editedIngredientId];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        };

        const ingredients = [...state.ingredients];
        ingredients[state.editedIngredientId] = updatedIngredient;

        return {
          ...state,
          ingredients: ingredients,
          editedIngredientId: -1,
          editedIngredient: null
        };


    case ShoppingListActions.DELETE_INGREDIENT:
        const oldIngredients = [...state.ingredients];
        oldIngredients.splice(state.editedIngredientId, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredientId: -1,
        editedIngredient: null
      };

    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return{
        ...state,
        editedIngredientId: action.payload,
        editedIngredient: editedIngredient
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientId: -1,
        editedIngredient: null
      };

    default:
      return state;
  }
}
