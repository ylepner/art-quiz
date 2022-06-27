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
  type$ = this.route.params.pipe(
    map((params) => params['type']),
  )

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PicturesService
  ) {

  }

  items$ = this.type$.pipe(
    map((category) => this.service.getCategories(category))
  )

}
