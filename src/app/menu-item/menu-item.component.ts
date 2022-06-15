import { Component, Input } from '@angular/core';
import { MenuItem } from '../models/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  private _item?: MenuItem;
  public get item() {
    return this._item;
  }

  @Input()
  public set item(value: MenuItem | undefined) {
    this._item = value;
    if (!value) {
      return;
    }
  }

  playAgainButton = false

  constructor() { }

  over() {
    this.playAgainButton = true
  }

  out() {
    this.playAgainButton = false
  }
}
