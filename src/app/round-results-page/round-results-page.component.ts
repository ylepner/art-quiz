import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { QuizType } from '../models/categories-models';
import { AnswerResult, ArtistResult, QuizResults, QuizResultsCategory } from '../models/quiz-results';
import { PicturesService } from '../pictures.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-round-results-page',
  templateUrl: './round-results-page.component.html',
  styleUrls: ['./round-results-page.component.scss']
})
export class RoundResultsPageComponent {
  results?: QuizResultsCategory
  currentQuizResult: ArtistResult[] = []
  quizNumber = 0

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

  quizResults$ = combineLatest([this.quizId$, this.quizType$]).pipe(
    map(([quizId, quizType]) => {
      return this.service.getQuizResult(quizId, quizType)
    }),
    map(val => {
      // this.service.convertResultItemToArtistResult
      return val.map((el) => this.service.convertResultItemToArtistResult(el))
    })
  )

  constructor(
    private service: ResultsService,
    private route: ActivatedRoute
  ) {
  }

}
