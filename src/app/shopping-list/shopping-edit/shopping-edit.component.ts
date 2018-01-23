import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameElement: ElementRef;
  @ViewChild('amountInput') amountElement: ElementRef;
  @Output() itemAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.itemAdded.emit(new Ingredient(
        this.nameElement.nativeElement.value, this.amountElement.nativeElement.value
      )
    );
  }
}
