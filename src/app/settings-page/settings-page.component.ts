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

  goToHome() {
    this.router.navigate(['home'])
  }

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
