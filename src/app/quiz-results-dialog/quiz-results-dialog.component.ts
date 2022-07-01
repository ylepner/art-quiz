import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultsService } from '../results.service';

export interface DialogData {
  correctAnswersNumber: number,
  hasMoreQuizzes: boolean
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
    private service: ResultsService
  ) { }

}
