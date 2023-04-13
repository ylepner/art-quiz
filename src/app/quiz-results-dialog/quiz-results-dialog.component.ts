import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PicturesService } from '../pictures.service';
import { SettingsService } from '../settings.service';
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
    private soundService: SoundsService,
    private picturesService: PicturesService,
    private settingsService: SettingsService
  ) {
    if (this.settingsService.getVolume() !== 0) {
      if (data.correctAnswersNumber < this.picturesService.questionsNumber) {
        this.soundService.playRoundEnd()
      } else {
        this.soundService.playGrandResult()
      }
    }
  }

  getQuestionsNumber() {
    return this.picturesService.questionsNumber
  }
}
