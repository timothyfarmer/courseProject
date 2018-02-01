import {Component, Input, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() shown = 'recipes';
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDDXp6n6D9--TVeenjYmxlsZzbCkjOjdvY",
      authDomain: "myrecipebook-b0436.firebaseapp.com",
      databaseURL: "https://myrecipebook-b0436.firebaseio.com",
      projectId: "myrecipebook-b0436",
      storageBucket: "myrecipebook-b0436.appspot.com",
      messagingSenderId: "89684677342"
    });
  }

  onLinkClicked(shown: string) {
    if (shown !== 'recipes' && shown !== 'list') {
      shown = 'recipes';
    }
    this.shown = shown;
  }
}
