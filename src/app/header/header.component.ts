import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() linkClicked = new EventEmitter<string>();

  onSelect(item: string) {
    console.log('clicked ' + item);
    this.linkClicked.emit(item);
  }
}
