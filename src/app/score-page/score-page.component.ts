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

  pictures: ArtistResult[]

  correctAnswers: number = 0

  constructor(
    private resultsService: ResultsService
  ) {
    this.pictures = this.resultsService.getArtistsResult()
    console.log(this.pictures)
    this.correctAnswers = this.getCorrectAnswers()
  }

  getCorrectAnswers() {
    return this.pictures.filter((el) => el.isCorrectAnswer).length
  }
}
