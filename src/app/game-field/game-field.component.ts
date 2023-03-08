import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { DialogData, PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';
import { SettingsService } from '../settings.service';

export interface QuizQuestion<T> {
  title: string;
  data: T;
}

export interface GameResult {
  correctAnswers: number
}

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent<TData> implements AfterViewInit {


  @Input()
  questions?: QuizQuestion<TData>[] | null;

  @Input()
  quizId?: number;

  currentIndex = 0;
  selectedAnswerNumber?: number;
  selectedAnswers: number[] = [];
  timerInterval?: any;
  timerValue = 100;
  timeConst?: number;
  dialogRef?: MatDialogRef<QuitGameDialogComponent, any>


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
  gameEnd = new EventEmitter<GameResult>()

  @Output()
  quitQuiz = new EventEmitter()

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private router: Router) {

    this.timeConst = this.time;
  }

  ngAfterViewInit() {
    if (this.time && this.time > 0) {
      this.startTimer()
    }
  }

  nextQuestion() {
    this.currentIndex += 1
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
    if (!this.dialogTemplate) {
      console.warn('No dialog template')
    }
    this.dialog.open(PictureInfoDialogComponent, {
      data: this.answerInfoFn(this.currentQuestion!, selectedAnswerNumber)
    }).afterClosed().subscribe(() => {
      if (this.currentIndex === this.questions!.length - 1) {
        console.log('the end')
        this.gameEnd.emit()
        return
      }
      this.nextQuestion()
    });
  }

  closeQuiz() {
    this.quitQuiz.emit()
  }

  startTimer() {
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
