import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, queueScheduler } from 'rxjs';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';
import { PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {
  currentQuestionNumber = 0
  questions: QuestionArtists[] = []
  selectedAnswerNumber?: number;
  correctAnswers = 0

  questions$ = this.route.params.pipe(
    map((params) => {
      return this.service.getArtistsGame(Number(params['id']))
    }),
  )
  constructor(
    private route: ActivatedRoute,
    private service: PicturesService,
    private dialog: MatDialog
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
        this.openPictureInfoDialog(this.selectedAnswerNumber)
      }
    }, 1000)
  }

  openPictureInfoDialog(selectedAnswerNumber: number) {
    const question = this.question
    const isCorrect = question.author === question.answers[selectedAnswerNumber]
    if (isCorrect) {
      this.correctAnswers += 1
    }
    const dialogRef = this.dialog.open(PictureInfoDialogComponent, {
      data: {
        image: question.img,
        isCorrect: isCorrect,
        name: question.name,
        info: `${question.author}, ${question.year}`
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.currentQuestionNumber === 9) {
        this.openGameResultsDialog()
      }
      this.nextQuestion()
    });
  }

  openGameResultsDialog() {
    const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
      data: {
        correctAnswersNumber: this.correctAnswers
      }
    })
  }
}
