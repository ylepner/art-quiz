import { AfterContentInit, AfterViewInit, Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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


  @ContentChild('question')
  gameTemplate!: TemplateRef<TData>;

  @ViewChild('answerDialog')
  answerTemplate!: TemplateRef<TData>;

  constructor(private dialog: MatDialog) {
  }

  nextQuestion() {
    this.currentIndex += 1
  }

  get currentQuestion() {
    return this.questions?.[this.currentIndex]
  }

  answerSelected = (answerNumber: number) => {
    this.selectedAnswerNumber = answerNumber
    setTimeout(() => {
      if (this.selectedAnswerNumber !== undefined) {
        this.openPictureInfoDialog(this.selectedAnswerNumber)
      }
    }, 1000)
  }

  openPictureInfoDialog(selectedAnswerNumber: number) {
    debugger
    this.dialog.open(this.answerTemplate)
  }
}
