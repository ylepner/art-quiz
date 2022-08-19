import { AfterContentInit, AfterViewInit, Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
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
export class GameFieldComponent<TData> implements AfterContentInit {

  @Input()
  questions?: QuizQuestion<TData>[] | null;

  currentIndex = 0;


  @ContentChild('question')
  gameTemplate!: TemplateRef<TData>;

  constructor() {
  }
  ngAfterContentInit(): void {
    console.log(this.gameTemplate)

  }
  ngAfterViewInit(): void {
    console.log(this.gameTemplate)
  }

  nextQuestion() {
    this.currentIndex += 1
  }

  get currentQuestion() {
    return this.questions?.[this.currentIndex]
  }



}
