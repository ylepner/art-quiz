import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerResult, ArtistResult, QuizResults } from '../models/quiz-results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent {

  results: AnswerResult[] = []
  pictures: ArtistResult[] = []

  correctAnswers: number = 0

  constructor(
    private resultsService: ResultsService
  ) {
    this.results = this.resultsService.getArrayOfAllQuizResultsAnswers()
    this.pictures = this.results.map((result) => this.resultsService.convertResultItemToArtistResult(result))
    this.correctAnswers = this.getCorrectAnswers()
  }

  getCorrectAnswers() {
    return this.pictures.filter((el) => el.isCorrectAnswer).length
  }
}
