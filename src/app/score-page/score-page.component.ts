import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { QuizType } from '../models/categories-models';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent {

  quizType$ = this.route.params.pipe(
    map((params) => {
      return params['quizType'] as QuizType;
    })
  )

  categoryResults$ = this.quizType$.pipe(
    map((category) => {
      return this.resultsService.getCategoryResults(category).results
    }),
  )

  categoryScore$ = this.quizType$.pipe(
    map((category) => {
      const results = this.resultsService.getCategoryResults(category)
      return { correctAnswers: results.correctAnswers, total: results.total }
    })
  )

  constructor(
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.settingsService.setTranslation();
  }

  toArtistsScore() {
    this.router.navigate(['score/artists'])
  }

  toPicturesScore() {
    this.router.navigate(['score/pictures'])
  }
}
