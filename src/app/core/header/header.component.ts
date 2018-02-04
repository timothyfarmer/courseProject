import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import * as  AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.active{ color: #000;}']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor(public store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  saveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  getData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
