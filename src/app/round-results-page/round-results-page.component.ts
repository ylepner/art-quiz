import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, firstValueFrom, map, Subscription } from 'rxjs';
import { QuizType } from '../models/categories-models';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-round-results-page',
  templateUrl: './round-results-page.component.html',
  styleUrls: ['./round-results-page.component.scss']
})
export class RoundResultsPageComponent implements OnDestroy {
  quizScore: any

  quizId$ = this.route.params.pipe(
    map((params) => {
      return Number(params['quizId'])
    })
  )

  quizType$ = this.route.params.pipe(
    map((params) => {
      return params['quizType'] as QuizType;
    })
  )

  quizScore$ = combineLatest([this.quizId$, this.quizType$]).pipe(
    map(([quizId, quizType]) => {
      return this.service.getQuizScore(quizId, quizType)
    })
  )

  quizResults$ = combineLatest([this.quizId$, this.quizType$]).pipe(
    map(([quizId, quizType]) => {
      return this.service.getQuizResult(quizId, quizType)
    }),
    map(val => {
      return val.map((el) => this.service.convertResultItemToArtistResult(el))
    })
  )

  subscription: Subscription;

  constructor(
    private service: ResultsService,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {
    this.settingsService.setTranslation();
    this.subscription = this.quizScore$.subscribe((data) => {
      this.quizScore = data
    })
    firstValueFrom(this.quizScore$).then((val) => {
      this.quizScore = val
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
