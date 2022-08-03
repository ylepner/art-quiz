import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuestionPictures } from '../models/question-models';
import { PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { PicturesService } from '../pictures.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-quiz-pictures-page',
  templateUrl: './quiz-pictures-page.component.html',
  styleUrls: ['./quiz-pictures-page.component.scss']
})
export class QuizPicturesPageComponent {

  quizNumber = 0
  questions: QuestionPictures[] = []
  currentQuestionNumber = 0
  selectedAnswerNumber?: number;
  correctAnswers = 0

  questions$ = this.route.params.pipe(
    map((params) => {
      this.quizNumber = Number(params['id'])
      return this.pictureService.getPicturesGame(Number(params['id']))
    }),
  )

  constructor(
    private route: ActivatedRoute,
    private pictureService: PicturesService,
    private resultsService: ResultsService,
    private dialog: MatDialog,
  ) {
    this.questions$.subscribe((questions) => {
      this.questions = questions
    })
  }

  get question() {
    return this.questions[this.currentQuestionNumber]
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
        image: question.answers[question.correctAnswer],
        isCorrect: isCorrect,
        name: question.name,
        info: `${question.author}, ${question.year}`
      },
    });
  }
}
