import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    private router: Router
  ) {
  }
}

