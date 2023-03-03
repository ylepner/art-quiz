import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DialogData, PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';

export interface QuizQuestion<T> {
  title: string;
  data: T;
}

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent<TData> {

  @Input()
  questions?: QuizQuestion<TData>[] | null;

  currentIndex = 0;
  selectedAnswerNumber?: number;
  selectedAnswers: number[] = [];

  @Input()
  answerInfoFn!: (quizQuestion: QuizQuestion<TData>, selectedAnswer: number) => DialogData;

  @Input()
  showTimer?: boolean;

  @ContentChild('question')
  gameTemplate!: TemplateRef<TData>;

  @ViewChild('answerDialog')
  dialogTemplate!: TemplateRef<any>

  @ContentChild('dialog')
  answerTemplate!: TemplateRef<TData>;

  @Output()
  gameEnd = new EventEmitter()

  @Output()
  quitQuiz = new EventEmitter()

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute) {
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
}
