import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PicturesService } from '../pictures.service';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';
import { ResultsService } from '../results.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent {


  constructor(
  ) { }

}
