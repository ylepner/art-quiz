import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {
  currentQuestionNumber = 0
  questions: QuestionArtists[] = []
  questions$ = this.route.params.pipe(
    map((params) => {
      return this.service.getArtistsGame(Number(params['id']))
    }),
  )
  constructor(
    private route: ActivatedRoute,
    private service: PicturesService
  ) {
    this.questions$.subscribe((questions) => {
      this.questions = questions
    })
  }

  get question() {
    return this.questions[this.currentQuestionNumber]
  }
}
