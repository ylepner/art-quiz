import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import images from '../data';
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
  answers: string[] = ['', '', '', '']

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

  nextQuestion() {
    if (this.currentQuestionNumber === 9) return
    this.currentQuestionNumber += 1
  }

  previousQuestion() {
    if (this.currentQuestionNumber === 0) return
    this.currentQuestionNumber -= 1
  }

  setCurrentButton(index: number) {
    return this.currentQuestionNumber = index
  }

  getAnswersOptions() {
    const allOptions = this.service.getAllAuthors()
    const randomNumberForCorrectAnswer = Math.floor(Math.random() * 4)
    this.answers[randomNumberForCorrectAnswer] = this.questions[this.currentQuestionNumber].correctAnswer
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * 93)
      const answer = allOptions[randomNumber]
      if (this.answers[i] === '')
        this.answers[i] === answer
    }
    console.log(this.answers)
  }
}
