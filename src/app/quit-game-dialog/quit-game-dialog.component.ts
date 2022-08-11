import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quit-game-dialog',
  templateUrl: './quit-game-dialog.component.html',
  styleUrls: ['./quit-game-dialog.component.scss']
})
export class QuitGameDialogComponent {

  constructor(
    public dialogRef: DialogRef,
  ) { }

  goBack() {
    history.back()
  }
}
