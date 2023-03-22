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
    tap((params) => console.log({ params })),
    map(params => Number(params['id']))
  )

  questions$ = this.gameId$.pipe(
    map((gameId) => {
      return this.pictureService.getArtistsGame(gameId).map(x => toQuizArtQuestion(x))
    }),
  )



  // quizNumber = 0
  currentQuestionNumber = 0
  // questions: QuestionArtists[] = [] 
  selectedAnswerNumber?: number;
  // correctAnswers = 0
  // questionsResults: AnswerResult[] = []

  // questions$ = this.route.params.pipe(
  //   map((params) => {
  //     this.quizNumber = Number(params['id'])
  //     return this.pictureService.getArtistsGame(Number(params['id']))
  //   }),
  // )

  // time?: number;
  // timeConst?: number;
  // volume: number;
  // timerInterval?: any;
  // dialogRef?: MatDialogRef<QuitGameDialogComponent, any>
  // timerValue = 100;

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

  async startNewRound(data: any) {
    this.resultsService.setQuizResults(data)
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

  //   this.questions$.subscribe((questions) => {
  //     this.questions = questions
  //   })

  //   this.time = this.settingsService.getTime()
  //   this.timeConst = this.time;
  //   this.startTimer()
  //   this.volume = this.settingsService.getVolume()
  // }
  // ngOnDestroy(): void {
  //   clearInterval(this.timerInterval)
  // }

  // get question() {
  //   return this.questions[this.currentQuestionNumber]
  // }

  // nextQuestion() {
  //   if (this.currentQuestionNumber === 9) return
  //   this.currentQuestionNumber += 1
  //   this.selectedAnswerNumber = undefined
  //   this.time = this.settingsService.getTime()
  //   this.timerValue = 100
  //   this.startTimer()
  // }

  // previousQuestion() {
  //   if (this.currentQuestionNumber === 0) return
  //   this.currentQuestionNumber -= 1
  //   this.selectedAnswerNumber = undefined
  // }

  setCurrentButton(index: number) {
    this.currentQuestionNumber = index
    this.selectedAnswerNumber = undefined
  }

  // selectAnswer(answerNumber: number) {
  //   this.selectedAnswerNumber = answerNumber
  //   setTimeout(() => {
  //     if (this.selectedAnswerNumber !== undefined) {
  //       this.openPictureInfoDialog(this.selectedAnswerNumber)
  //     }
  //   }, 1000)
  // }

  // openPictureInfoDialog(selectedAnswerNumber: number) {
  //   const question = this.question
  //   const isCorrect = question.author === question.answers[selectedAnswerNumber]
  //   this.updateQuestionResults(question.number, isCorrect)
  //   if (isCorrect) {
  //     this.correctAnswers += 1
  //   }
  //   const dialogRef = this.dialog.open(PictureInfoDialogComponent, {
  //     data: {
  //       image: question.img,
  //       isCorrect: isCorrect,
  //       name: question.name,
  //       info: `${question.author}, ${question.year}`
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     if (this.currentQuestionNumber === 9) {
  //       this.resultsService.setQuizResults({ quizNumber: this.quizNumber, results: this.questionsResults })
  //       this.openGameResultsDialog()
  //     }
  //     this.nextQuestion()
  //   });
  // }

  // openGameResultsDialog() {
  //   const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
  //     data: {
  //       correctAnswersNumber: this.correctAnswers,
  //       hasMoreQuizzes: this.quizNumber !== NUMBER_OF_QUIZZES,
  //       quizNumber: this.getQuizNumber(),
  //       quizName: 'artists'
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.currentQuestionNumber = 0
  //     this.selectedAnswerNumber = undefined
  //     this.correctAnswers = 0
  //   })
  // }

  // getQuizNumber() {
  //   if (this.quizNumber !== NUMBER_OF_QUIZZES) {
  //     return this.quizNumber + 1
  //   }
  //   return this.quizNumber
  // }

  // updateQuestionResults(questionNumber: number, isCorrect: boolean) {

  //   this.questionsResults.push({ questionNumber: questionNumber, isCorrectAnswer: isCorrect })
  // }

  // openQuitTheGameDialog() {
  //   this.dialogRef = this.dialog.open(QuitGameDialogComponent, {})
  //   this.dialogRef.afterClosed().subscribe((data) => {
  //     if (data) {
  //       this.router.navigate(['categories/artists'])
  //     }
  //   })
  // }

  // stopGame() {
  //   const dialogRef = this.dialog.open(GameOverDialogComponent, {
  //     data: {
  //       quizNumber: this.quizNumber,
  //       quizName: 'artists'
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe((data) => {
  //     if (this.dialogRef) {
  //       this.dialogRef.close()
  //     }
  //     if (data) {
  //       this.currentQuestionNumber = 0
  //       this.time = this.settingsService.getTime()
  //       this.startTimer()
  //     } else {
  //       this.router.navigate(['categories/artists'])
  //     }
  //   })
  // }

  // startTimer() {
  //   this.timerInterval = setInterval(() => {
  //     if (this.time) {
  //       this.time--
  //       this.timerValue = this.timerValue - this.getTimerSegment()
  //       if (this.selectedAnswerNumber !== undefined) {
  //         clearInterval(this.timerInterval)
  //       }
  //       if (this.time === 0 && this.selectedAnswerNumber === undefined) {
  //         clearInterval(this.timerInterval)
  //         this.stopGame()
  //       }
  //     }
  //   }, 1000)
  // }

  // getTimerSegment() {
  //   if (this.timeConst) {
  //     return 100 / this.timeConst;
  //   }
  //   return 0
  // }
}
