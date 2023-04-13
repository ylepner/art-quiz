import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { QuestionArtists } from '../models/question-models';
import { PicturesService } from '../pictures.service';
import { DialogData, PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
import { AnswerResult } from '../models/quiz-results';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { SoundsService } from '../sounds.service';
import { QuizQuestion } from '../game-field/game-field.component';

const NUMBER_OF_QUIZZES = 11

function toQuizArtQuestion(questionArtist: QuestionArtists): QuizQuestion<QuestionArtists> {
  return {
    title: `Who is the author of this picture?`,
    pictureNumber: questionArtist.number,
    data: questionArtist
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
    private resultsService: ResultsService,
    private dialog: MatDialog,
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
