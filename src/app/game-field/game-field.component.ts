import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { AnswerResult } from '../models/quiz-results';
import { DialogData, PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { PicturesService } from '../pictures.service';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

export interface QuizQuestion<T> {
  title: string;
  pictureNumber: number;
  data: T;
}

export interface GameResult {
  correctAnswers: number
}

const NUMBER_OF_QUIZZES = 11;

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent<TData> implements AfterViewInit {


  @Input()
  questions?: QuizQuestion<TData>[] | null;

  @Input()
  quizId!: number;

  currentIndex = 0;
  selectedAnswerNumber?: number;
  selectedAnswers: number[] = [];
  timerInterval?: any;
  timerValue = 100;
  timeConst?: number;
  dialogRef?: MatDialogRef<QuitGameDialogComponent, any>
  questionsResults: AnswerResult[] = []
  correctAnswers = 0
  questionsPerGame: number

  @Input()
  answerInfoFn!: (quizQuestion: QuizQuestion<TData>, selectedAnswer: number) => DialogData;

  @Input()
  showTimer?: boolean;

  @Input()
  time?: number;

  @ContentChild('question')
  gameTemplate!: TemplateRef<TData>;

  @ViewChild('answerDialog')
  dialogTemplate!: TemplateRef<any>

  @ContentChild('dialog')
  answerTemplate!: TemplateRef<TData>;

  @Output()
  gameEnd = new EventEmitter<AnswerResult[]>()

  @Output()
  quitQuiz = new EventEmitter()

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private picturesService: PicturesService,
    private router: Router,
    private resultsService: ResultsService) {
    this.questionsPerGame = this.picturesService.questionsNumber
    this.time = this.settingsService.getTime()
    this.timeConst = this.time;
  }

  ngAfterViewInit() {
    if (this.time && this.time > 0) {
      this.startTimer()
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval)
  }

  nextQuestion() {
    if (this.currentIndex === 9) return
    this.currentIndex += 1
    this.selectedAnswerNumber = undefined
    this.time = this.settingsService.getTime()
    this.timerValue = 100
    this.startTimer()
  }

  get currentQuestion() {
    return this.questions?.[this.currentIndex]
  }

  answerSelected = (answerNumber: number) => {
    this.selectedAnswerNumber = answerNumber
    this.selectedAnswers = [...this.selectedAnswers, answerNumber];
    setTimeout(() => {
      if (this.selectedAnswerNumber !== undefined) {
        this.openPictureInfoDialog(this.selectedAnswerNumber)
      }
    }, 1000)
  }

  openPictureInfoDialog(selectedAnswerNumber: number) {
    const data = this.answerInfoFn(this.currentQuestion!, selectedAnswerNumber)
    const isCorrect = data.isCorrect;
    const questionNumber = this.currentQuestion?.pictureNumber
    if (this.currentQuestion) {
      this.updateQuestionResults(questionNumber!, data.isCorrect)
      if (isCorrect) {
        this.correctAnswers += 1
      }
    }
    if (!this.dialogTemplate) {
      console.warn('No dialog template')
    }
    this.dialog.open(PictureInfoDialogComponent, {
      data: data
    }).afterClosed().subscribe(() => {
      if (this.currentIndex === this.questions!.length - 1) {
        this.openGameResultsDialog()
        this.gameEnd.emit(this.questionsResults)
        return
      }
      this.nextQuestion()
    })
  }

  updateQuestionResults(questionNumber: number, isCorrect: boolean) {
    this.questionsResults.push({ questionNumber: questionNumber, isCorrectAnswer: isCorrect })
    console.log(this.questionsResults)
  }

  openGameResultsDialog() {
    const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
      data: {
        correctAnswersNumber: this.correctAnswers,
        hasMoreQuizzes: this.quizId !== NUMBER_OF_QUIZZES,
        quizNumber: this.quizId,
        quizName: 'artists'
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.currentIndex = 0
      this.selectedAnswerNumber = undefined
      this.correctAnswers = 0
    })
  }

  closeQuiz() {
    this.quitQuiz.emit()
  }

  startTimer() {
    this.timerValue = 100
    this.timerInterval = setInterval(() => {
      if (this.time) {
        this.time--
        this.timerValue = this.timerValue - this.getTimerSegment()
        if (this.selectedAnswerNumber !== undefined) {
          clearInterval(this.timerInterval)
        }
        if (this.time === 0 && this.selectedAnswerNumber === undefined) {
          clearInterval(this.timerInterval)
          this.stopGame()
        }
      }
    }, 1000)
  }

  getTimerSegment() {
    if (this.timeConst) {
      return 100 / this.timeConst;
    }
    return 0
  }

  stopGame() {
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      data: {
        quizNumber: this.quizId,
        quizName: 'artists'
      }
    })
    dialogRef.afterClosed().subscribe((data) => {
      if (this.dialogRef) {
        this.dialogRef.close()
      }
      if (data) {
        this.currentIndex = 0
        this.time = this.settingsService.getTime()
        this.startTimer()
      } else {
        this.router.navigate(['categories/artists'])
      }
    })
  }


}
