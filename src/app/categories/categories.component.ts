import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CategoryItem } from '../models/categories-models';
import { PicturesService } from '../pictures.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  items?: CategoryItem[] | null


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PicturesService
  ) {

  }

  goToHome() {
    this.router.navigate(['home'])
  }

  goToSettings() {
    this.router.navigate(['settings'])
  }

  items$ = this.route.params.pipe(
    map((params) => params['type']),
    map((category) => this.service.getCategories(category))
  )
}
