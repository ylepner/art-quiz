import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { QuizQuestion } from '../game-field/game-field.component';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { QuestionPictures } from '../models/question-models';
import { AnswerResult } from '../models/quiz-results';
import { DialogData, PictureInfoDialogComponent } from '../picture-info-dialog/picture-info-dialog.component';
import { PicturesService } from '../pictures.service';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';
import { QuizResultsDialogComponent } from '../quiz-results-dialog/quiz-results-dialog.component';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

function toQuizPicQuestion(questionPicture: QuestionPictures): QuizQuestion<QuestionPictures> {
  const title = getTitle(questionPicture.author)
  return {
    title: title,
    pictureNumber: questionPicture.number,
    data: questionPicture
  }
}

function getTitle(author: string) {
  const language = localStorage.getItem('language' || 'en')
  if (language === 'en') {
    return `Which is ${author} picture?`
  } else {
    return `Автором какой картины является ${author}?`
  }
}

@Component({
  selector: 'app-quiz-pictures-page',
  templateUrl: './quiz-pictures-page.component.html',
  styleUrls: ['./quiz-pictures-page.component.scss']
})
export class QuizPicturesPageComponent {

  time: number | undefined;
  showTimer = false;

  gameId$ = this.route.params.pipe(
    map(params => Number(params['id']))
  )

  questions$ = this.gameId$.pipe(
    map((gameId) => {
      return this.pictureService.getPicturesGame(gameId).map(x => toQuizPicQuestion(x))
    }),
  )

  answerInfoFn(quizQuestion: QuizQuestion<QuestionPictures>, selectedAnswer: number): DialogData {
    const pictureData = quizQuestion.data
    return {
      isCorrect: pictureData.correctAnswer === selectedAnswer,
      image: pictureData.answers[pictureData.correctAnswer],
      info: `${pictureData.author}, ${pictureData.year}`,
      name: pictureData.name
    }
  }

  async startNewRound() {
    const gameId = await firstValueFrom(this.gameId$);
    this.router.navigate(['quiz', 'pictures', gameId + 1])
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PicturesService,
    private resultsService: ResultsService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {
    this.showTimer = this.ifTimer()
    this.time = this.settingsService.getTime();
  }

  ifTimer() {
    if (this.settingsService.getTime()) {
      return true
    }
    return false
  }

  goToCategories() {
    this.router.navigate(['categories/pictures'])
  }
}
