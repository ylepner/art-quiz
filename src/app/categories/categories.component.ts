import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['home'])
  }

  goToSettings() {
    this.router.navigate(['settings'])
  }
}
