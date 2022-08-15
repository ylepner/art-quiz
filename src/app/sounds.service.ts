import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor() { }

  playCorrectAnswer() {
    const audio = new Audio();
    audio.src = 'assets/mp3/correct-answer-sound.mp3';
    audio.load();
    audio.play();
  }

  playWrongAnswer() {
    const audio = new Audio();
    audio.src = 'assets/mp3/incorrect-answer-sound.mp3';
    audio.load();
    audio.play();
  }

  playRoundEnd() {
    const audio = new Audio();
    audio.src = 'assets/mp3/success-fanfare.mp3';
    audio.load();
    audio.play();
  }

  playGrandResult() {
    const audio = new Audio();
    audio.src = 'assets/mp3/grand-result.mp3';
    audio.load();
    audio.play();
  }
}