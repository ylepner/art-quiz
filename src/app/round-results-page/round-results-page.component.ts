import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuizResults } from '../models/quiz-results';
import { PicturesService } from '../pictures.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-round-results-page',
  templateUrl: './round-results-page.component.html',
  styleUrls: ['./round-results-page.component.scss']
})
export class RoundResultsPageComponent {
  results: Record<number, QuizResults> = {}
  quizNumber = 0

  quizResults$ = this.route.params.pipe(
    map((params) => {
      return Number(params['quizId'])
    }),
    map((quizId) => {
      return this.results[quizId]
    })
  )

  constructor(
    private service: ResultsService,
    private route: ActivatedRoute
  ) {
    this.getResults()
  }

  getResults() {
    this.results = this.service.getAllQuizResults()
  }
}
