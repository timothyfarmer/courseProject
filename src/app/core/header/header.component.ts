import { Component } from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active{ color: #000;}']
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService, public authService: AuthService) {}
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

  onLogout() {
    this.authService.logout();
  }
}
