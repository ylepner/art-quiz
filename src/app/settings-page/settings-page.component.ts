import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  volume = 0
  time: number | undefined = 0
  language = ''

  @Output()
  languageChange = new EventEmitter()

  constructor(
    private router: Router,
    private service: SettingsService,
  ) {
    this.time = this.service.getTime();
    this.volume = this.service.getVolume();
    this.language = this.service.getLanguage();
  }

  addTime() {
    if (this.time != null) {
      if (this.time < 30) {
        this.time += 5
      }
    }
  }

  reduceTime() {
    if (this.time != null) {
      if (this.time > 5) {
        this.time -= 5
      }
    }
  }

  setDefaultSettings() {
    this.service.setDefaultSettings()
    this.volume = this.service.getVolume()
    this.timeGame = false
    this.language = 'en'
    this.goBack()
  }

  get timeGame() {
    return this.time != null;
  }

  set timeGame(value: boolean) {
    if (value) {
      this.time = 5;
    } else {
      this.time = undefined;
    }
  }

  setCustomerSettings() {
    this.service.setCustomerSettings(this.volume, this.language, this.time)
    this.goBack()
  }

  goBack() {
    history.back()
  }

  setLanguage(value: string) {
    this.service.setLanguage(value)
  }
}
