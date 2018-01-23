import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() shown = 'recipes';

  onLinkClicked(shown: string) {
    if (shown !== 'recipes' && shown !== 'list') {
      shown = 'recipes';
    }
    this.shown = shown;
  }
}
