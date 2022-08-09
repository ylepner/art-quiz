import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ArtistResult, QuizResults } from '../models/quiz-results';
import { PicturesService } from '../pictures.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-round-results-page',
  templateUrl: './round-results-page.component.html',
  styleUrls: ['./round-results-page.component.scss']
})
export class RoundResultsPageComponent {
  results: Record<number, QuizResults> = {}
  currentQuizResult: ArtistResult[] = []
  quizNumber = 0

  quizResults$ = this.route.params.pipe(
    map((params) => {
      return Number(params['quizId'])
    }),
    map((quizId) => {
      return this.service.getQuizResult(quizId)
    })
  )

  quizType$ = this.route.params.pipe(
    map((params) => {
      console.log(params['quizType'])
      return params['quizType'] as string;
    })
  )

  constructor(
    private service: ResultsService,
    private route: ActivatedRoute
  ) {
    this.getResults()
    this.quizType$.subscribe(t => {
      console.log('quizType$', t)
    })
  }

  getResults() {
    this.results = this.service.getAllQuizResults()
  }

}
