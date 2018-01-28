import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {

  baseUrl = 'https://myrecipebook-b0436.firebaseio.com/';

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.baseUrl + 'recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.baseUrl + 'recipes.json')
      .map(
        (response: Response) => {
          const recipes = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          console.log(recipes);
          return recipes;
        }
      ).subscribe(
      (recipes: Recipe[]) =>{
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
