import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoundsService } from '../sounds.service';
export interface DialogData {
  correctAnswersNumber: number,
  hasMoreQuizzes: boolean,
  quizNumber: number,
  quizName: string,
  questionsNumber: number
}

@Component({
  selector: 'app-quiz-results-dialog',
  templateUrl: './quiz-results-dialog.component.html',
  styleUrls: ['./quiz-results-dialog.component.scss']
})
export class QuizResultsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef,
    private soundService: SoundsService
  ) {
    if (data.correctAnswersNumber < 10) {
      this.soundService.playRoundEnd()
    } else {
      this.soundService.playGrandResult()
    }
  }

}
