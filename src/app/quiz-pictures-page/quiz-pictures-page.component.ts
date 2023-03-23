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
  return {
    title: `Which is ${questionPicture.author} picture?`,
    pictureNumber: questionPicture.number,
    data: questionPicture
  }
}

@Component({
  selector: 'app-quiz-pictures-page',
  templateUrl: './quiz-pictures-page.component.html',
  styleUrls: ['./quiz-pictures-page.component.scss']
})
export class QuizPicturesPageComponent {

  // quizNumber = 0
  // questions: QuestionPictures[] = []
  // currentQuestionNumber = 0
  // selectedAnswerNumber?: number;
  // correctAnswers = 0
  // questionsResults: AnswerResult[] = []

  time: number | undefined;
  showTimer = false;

  gameId$ = this.route.params.pipe(
    tap((params) => console.log({ params })),
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
  // time?: number;
  // volume: number;
  // timerInterval?: any;
  // dialogRef?: MatDialogRef<QuitGameDialogComponent, any>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PicturesService,
    private resultsService: ResultsService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {
    this.showTimer = this.ifTimer()
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

  // this.questions$.subscribe((questions) => {
  //   this.questions = questions
  // })

  //   this.time = this.settingsService.getTime()

  //   this.startTimer()

  //   this.volume = this.settingsService.getVolume()
  // }

  // ngOnDestroy(): void {
  //   clearInterval(this.timerInterval)
  // }

  // get question() {
  //   return this.questions[this.currentQuestionNumber]
  // }

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
  //   const isCorrect = selectedAnswerNumber === question.correctAnswer
  //   this.updateQuestionResults(question.number, isCorrect)
  //   if (isCorrect) {
  //     this.correctAnswers += 1
  //   }
  //   const dialogRef = this.dialog.open(PictureInfoDialogComponent, {
  //     data: {
  //       image: question.answers[question.correctAnswer],
  //       isCorrect: isCorrect,
  //       name: question.name,
  //       info: `${question.author}, ${question.year}`
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     if (this.currentQuestionNumber === 9) {
  //       this.resultsService.setQuizResults({ quizNumber: this.quizNumber, results: this.questionsResults })
  //       this.openGameResultsDialog()
  //       return
  //     }
  //     this.nextQuestion()
  //   });
  // }

  // nextQuestion() {
  //   this.currentQuestionNumber += 1
  //   this.selectedAnswerNumber = undefined
  //   this.time = this.settingsService.getTime()
  //   this.startTimer()
  // }

  // openGameResultsDialog() {
  //   const dialogRef = this.dialog.open(QuizResultsDialogComponent, {
  //     data: {
  //       correctAnswersNumber: this.correctAnswers,
  //       hasMoreQuizzes: this.quizNumber !== 11,
  //       quizNumber: this.quizNumber,
  //       quizName: 'pictures'
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe(() => {
  //     if (this.quizNumber <= 11) {
  //       this.quizNumber += 1
  //       this.currentQuestionNumber = 0
  //       this.selectedAnswerNumber = undefined
  //       this.correctAnswers = 0
  //     }
  //   })
  // }

  // updateQuestionResults(questionNumber: number, isCorrect: boolean) {
  //   this.questionsResults.push({ questionNumber: questionNumber, isCorrectAnswer: isCorrect })
  // }

  // stopGame() {
  //   const dialogRef = this.dialog.open(GameOverDialogComponent, {
  //     data: {
  //       quizNumber: this.quizNumber,
  //       quizName: 'pictures'
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
  //       this.router.navigate(['categories/pictures'])
  //     }
  //   })
  // }

  // startTimer() {
  //   this.timerInterval = setInterval(() => {
  //     if (this.time) {
  //       this.time--
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

  // openQuitTheGameDialog() {
  //   this.dialogRef = this.dialog.open(QuitGameDialogComponent, {})
  //   this.dialogRef.afterClosed().subscribe((data) => {
  //     if (data) {
  //       this.router.navigate(['categories/pictures'])
  //     }
  //   })
  // }
}
