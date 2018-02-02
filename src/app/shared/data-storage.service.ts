import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  baseUrl = 'https://myrecipebook-b0436.firebaseio.com/'; // should be stored in a file that is in .gitignore

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    // return this.http.put(this.baseUrl + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
    return this.http.put(this.baseUrl + 'recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.baseUrl + 'recipes.json')
      .map(
        (recipes) => {
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
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
