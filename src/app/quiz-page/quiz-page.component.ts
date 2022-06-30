import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, queueScheduler } from 'rxjs';
import images from '../data';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {
  currentQuestionNumber = 0
  questions: QuestionArtists[] = []
  selectedAnswerNumber?: number;

  questions$ = this.route.params.pipe(
    map((params) => {
      return this.service.getArtistsGame(Number(params['id']))
    }),
  )
  constructor(
    private route: ActivatedRoute,
    private service: PicturesService,
    private dialog: Dialog
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
    this.selectedAnswerNumber = undefined
  }

  previousQuestion() {
    if (this.currentQuestionNumber === 0) return
    this.currentQuestionNumber -= 1
    this.selectedAnswerNumber = undefined
  }

  setCurrentButton(index: number) {
    this.currentQuestionNumber = index
    this.selectedAnswerNumber = undefined
  }

  selectAnswer(answerNumber: number) {
    this.selectedAnswerNumber = answerNumber
    setTimeout(() => {
      if (this.selectedAnswerNumber !== undefined) {
        this.openDialog(this.selectedAnswerNumber)
      }
    }, 1000)
  }

  openDialog(selectedAnswerNumber: number) {
    const question = this.question
    this.dialog.open(PictureInfoDialogComponent, {
      minWidth: '300px',
      data: {
        image: question.img,
        isCorrect: question.author === question.answers[selectedAnswerNumber],
        name: question.name,
        info: `${question.author}, ${question.year}`
      },
    });
  }
}
