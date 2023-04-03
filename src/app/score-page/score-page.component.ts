import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuizType } from '../models/categories-models';
import { AnswerResult, ArtistResult, QuizResults } from '../models/quiz-results';
import { ResultsService } from '../results.service';

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

  pictures: ArtistResult[]
  correctAnswers: number = 0

  constructor(
    private resultsService: ResultsService,
    private route: ActivatedRoute
  ) {
    this.pictures = this.resultsService.getArtistsResult()
    console.log(this.pictures)
    this.correctAnswers = this.getCorrectAnswers()
  }

  getCorrectAnswers() {
    return this.pictures.filter((el) => el.isCorrectAnswer).length
  }
}
