import { Component, OnInit } from '@angular/core';
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

  constructor(
    private service: ResultsService
  ) {
    this.getResults()
  }

  getResults() {
    this.results = this.service.getQuizResults()
  }
}
