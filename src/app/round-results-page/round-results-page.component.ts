import { Component, OnInit } from '@angular/core';
import { PicturesService } from '../pictures.service';

@Component({
  selector: 'app-round-results-page',
  templateUrl: './round-results-page.component.html',
  styleUrls: ['./round-results-page.component.scss']
})
export class RoundResultsPageComponent {

  constructor(
    private service: PicturesService
  ) { }

}
