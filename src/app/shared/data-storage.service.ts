import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  baseUrl = 'https://myrecipebook-b0436.firebaseio.com/'; // should be stored in a file that is in .gitignore

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(this.baseUrl + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get(this.baseUrl + 'recipes.json?auth=' + token)
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
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
