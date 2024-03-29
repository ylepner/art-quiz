import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CategoryItem } from '../models/categories-models';
import { PicturesService } from '../pictures.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings.service';
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
    private route: ActivatedRoute,
    private service: PicturesService,
    private settingsService: SettingsService
  ) {
    this.settingsService.setTranslation();
  }

  items$ = this.type$.pipe(
    map((category) => this.service.getCategories(category))
  )

}
