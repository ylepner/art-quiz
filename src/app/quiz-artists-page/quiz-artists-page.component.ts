import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';
import { PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
import { AnswerResult } from '../models/quiz-results';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

const NUMBER_OF_QUIZZES = 11
@Component({
  selector: 'app-quiz-artists-page',
  templateUrl: './quiz-artists-page.component.html',
  styleUrls: ['./quiz-artists-page.component.scss']
})

export class QuizArtistsPageComponent {
  quizNumber = 0
  currentQuestionNumber = 0
  questions: QuestionArtists[] = []
  selectedAnswerNumber?: number;
  correctAnswers = 0
  questionsResults: AnswerResult[] = []

  questions$ = this.route.params.pipe(
    map((params) => {
      this.quizNumber = Number(params['id'])
      return this.pictureService.getArtistsGame(Number(params['id']))
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
      }

    }, 1000)

    this.volume = this.settingsService.getVolume()

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
    this.updateQuestionResults(question.number, isCorrect)
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
        this.resultsService.setQuizResults({ quizNumber: this.quizNumber, results: this.questionsResults })
        this.openGameResultsDialog()
      }
      this.nextQuestion()
    });
  }

  openGameResultsDialog() {
    const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
      data: {
        correctAnswersNumber: this.correctAnswers,
        hasMoreQuizzes: this.quizNumber !== NUMBER_OF_QUIZZES,
        quizNumber: this.getQuizNumber(),
        quizName: 'artists'
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.currentQuestionNumber = 0
      this.selectedAnswerNumber = undefined
      this.correctAnswers = 0
    })
  }

  getQuizNumber() {
    if (this.quizNumber !== NUMBER_OF_QUIZZES) {
      return this.quizNumber + 1
    }
    return this.quizNumber
  }

  updateQuestionResults(questionNumber: number, isCorrect: boolean) {
    this.questionsResults.push({ questionNumber: questionNumber, isCorrectAnswer: isCorrect })
  }
}
