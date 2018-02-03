import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {Recipe} from '../../recipes/recipe.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active{ color: #000;}']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor(private dataService: DataStorageService,
              public authService: AuthService,
              public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

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
