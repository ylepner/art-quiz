import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
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

  constructor(@Inject(DIALOG_DATA) public data: DialogData) { }

}
