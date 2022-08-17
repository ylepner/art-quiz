import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizResults } from '../models/quiz-results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent {

  results: Record<number, QuizResults> = {}
  allResults: Record<number, QuizResults> = []

  constructor(
    private resultsService: ResultsService
  ) {
    const res = this.resultsService.getArrayOfAllQuizResultsAnswers()
    console.log(res)
  }

}
