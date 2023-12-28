import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';
import { DialogData } from '../picture-info-dialog/picture-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';
import { QuizQuestion } from '../game-field/game-field.component';

const NUMBER_OF_QUIZZES = 11

function toQuizArtQuestion(questionArtist: QuestionArtists): QuizQuestion<QuestionArtists> {
  const title = getTitle()
  return {
    title: title,
    pictureNumber: questionArtist.number,
    data: questionArtist
  }
}

function getTitle() {
  const language = localStorage.getItem('language' || 'en')
  if (language === 'en') {
    return `Who is the author of this picture?`
  } else {
    return `Кто автор этой картины?`
  }
}
@Component({
  selector: 'app-quiz-artists-page',
  templateUrl: './quiz-artists-page.component.html',
  styleUrls: ['./quiz-artists-page.component.scss']
})

export class QuizArtistsPageComponent {

  showTimer = false;
  time: number | undefined;

  gameId$ = this.route.params.pipe(
    map(params => Number(params['id']))
  )

  questions$ = this.gameId$.pipe(
    map((gameId) => {
      return this.pictureService.getArtistsGame(gameId).map(x => toQuizArtQuestion(x))
    }),
  )

  currentQuestionNumber = 0
  selectedAnswerNumber?: number;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PicturesService,
    private settingsService: SettingsService,
    private router: Router
  ) {
    this.showTimer = this.ifTimer()
    this.time = this.settingsService.getTime();
  }

  answerInfoFn(quizQuestion: QuizQuestion<QuestionArtists>, selectedAnswer: number): DialogData {
    const artistData = quizQuestion.data
    return {
      isCorrect: artistData.correctAnswer === selectedAnswer,
      image: artistData.img,
      info: `${artistData.author}, ${artistData.year}`,
      name: artistData.name,
    }
  }

  async startNewRound() {
    const gameId = await firstValueFrom(this.gameId$);
    this.router.navigate(['quiz', 'artists', gameId + 1])
  }

  goToCategories() {
    this.router.navigate(['categories/artists'])
  }

  ifTimer() {
    if (this.settingsService.getTime()) {
      return true
    }
    return false
  }

  setCurrentButton(index: number) {
    this.currentQuestionNumber = index
    this.selectedAnswerNumber = undefined
  }

}
