import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input()
  items?: MenuItem[] | null;

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['home'])
  }

  goToSettings() {
    this.router.navigate(['settings'])
  }
}
