import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItem } from '../models/categories-models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input()
  item?: CategoryItem

  @Input()
  link = ''
  showPlayAgainButton = false

  constructor(private router: Router) { }

}
