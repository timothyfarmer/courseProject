import { Component } from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from '../shared/data-storage.service';
import {Subject} from 'rxjs/Subject';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active{ color: #000;}']
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService, private recipeService: RecipeService) {}
  saveData() {
    this.dataService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response.json());
      }
    );
  }

  getData() {
    this.dataService.getRecipes();
  }
}
