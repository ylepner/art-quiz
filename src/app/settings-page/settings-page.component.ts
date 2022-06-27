import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  time = 5

  constructor(private router: Router) { }


  addTime() {
    if (this.time < 30) {
      this.time += 5
    }
  }

  reduceTime() {
    if (this.time > 5) {
      this.time -= 5
    }
  }
}
