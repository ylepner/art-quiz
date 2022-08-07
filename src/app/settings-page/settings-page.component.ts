import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  volume = 0
  time = 5
  timeGame = false

  constructor(
    private router: Router,
    private service: SettingsService
  ) { }



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

  setDefaultSettings() {
    this.service.setDefaultSettings()
  }


}
