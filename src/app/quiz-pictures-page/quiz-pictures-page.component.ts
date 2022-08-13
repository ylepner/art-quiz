import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { QuestionPictures } from '../models/question-models';
import { AnswerResult } from '../models/quiz-results';
import { PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { PicturesService } from '../pictures.service';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

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
  questionsResults: AnswerResult[] = []

  questions$ = this.route.params.pipe(
    map((params) => {
      this.quizNumber = Number(params['id'])
      return this.pictureService.getPicturesGame(Number(params['id']))
    }),
  )

  time?: number;
  volume: number;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PicturesService,
    private resultsService: ResultsService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {
    this.questions$.subscribe((questions) => {
      this.questions = questions
    })

    this.time = this.settingsService.getTime()
    setInterval(() => {
      if (this.time) {
        this.time--
        if (this.time === 0) {
          this.stopGame()
        }
      }

    }, 1000)

    this.volume = this.settingsService.getVolume()
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
    const isCorrect = selectedAnswerNumber === question.correctAnswer
    this.updateQuestionResults(question.number, isCorrect)
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
    dialogRef.afterClosed().subscribe(() => {
      if (this.currentQuestionNumber === 9) {
        this.resultsService.setQuizResults({ quizNumber: this.quizNumber, results: this.questionsResults })
        this.openGameResultsDialog()
      }
      this.nextQuestion()
    });
  }

  nextQuestion() {
    if (this.currentQuestionNumber === 9) return
    this.currentQuestionNumber += 1
    this.selectedAnswerNumber = undefined
  }

  openGameResultsDialog() {
    const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
      data: {
        correctAnswersNumber: this.correctAnswers,
        hasMoreQuizzes: this.quizNumber !== 11,
        quizNumber: this.quizNumber,
        quizName: 'pictures'
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      if (this.quizNumber <= 11) {
        this.quizNumber += 1
        this.currentQuestionNumber = 0
        this.selectedAnswerNumber = undefined
        this.correctAnswers = 0
      }
    })
  }

  updateQuestionResults(questionNumber: number, isCorrect: boolean) {
    this.questionsResults.push({ questionNumber: questionNumber, isCorrectAnswer: isCorrect })
  }

  stopGame() {
    this.dialog.open(GameOverDialogComponent)
  }
}
