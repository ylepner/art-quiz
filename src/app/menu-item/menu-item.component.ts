import { Component, Input, Output } from '@angular/core';
import { MenuItem } from '../models/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input()
  item?: MenuItem

  showPlayAgainButton = false

  constructor() { }

  over() {
    this.showPlayAgainButton = true
  }

  out() {
    this.showPlayAgainButton = false
  }
}
