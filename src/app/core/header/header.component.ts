import { Component } from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {Recipe} from '../../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active{ color: #000;}']
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService, public authService: AuthService) {}
  saveData() {
    this.dataService.storeRecipes().subscribe(
      (response: Recipe[]) => {
        console.log(response);
      }
    );
  }

  getData() {

    this.dataService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
