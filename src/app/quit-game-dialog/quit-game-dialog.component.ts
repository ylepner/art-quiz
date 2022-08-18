import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-quit-game-dialog',
  templateUrl: './quit-game-dialog.component.html',
  styleUrls: ['./quit-game-dialog.component.scss']
})
export class QuitGameDialogComponent {

  quizType$ = this.route.params.pipe(
    map((params) => {
      console.log(params)
      console.log(params['quizType'])
      return params['quizType'] as string;
    })
  )

  constructor(
    public dialogRef: DialogRef,
    private route: ActivatedRoute
  ) {
  }

  goBack() {
    history.back()
  }
}
