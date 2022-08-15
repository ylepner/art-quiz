import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoundsService } from '../sounds.service';
export interface DialogData {
  image: string,
  isCorrect: boolean,
  name: string,
  info: string
}
@Component({
  selector: 'app-picture-info-dialog',
  templateUrl: './picture-info-dialog.component.html',
  styleUrls: ['./picture-info-dialog.component.scss']
})
export class PictureInfoDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: DialogRef,
    private soundService: SoundsService) {
    if (data.isCorrect) {
      this.soundService.playCorrectAnswer()
    } else {
      this.soundService.playWrongAnswer()
    }
  }

}
