import { Injectable } from '@angular/core';
import { Settings } from './models/settings-models';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings = {
    volume: 0,
    time: 0,
    language: 'en'
  }

  constructor(
  ) {
    const settingsData = localStorage.getItem('settings')
    if (settingsData) {
      this.settings = JSON.parse(settingsData)
    }
  }

  setDefaultSettings() {
    this.setVolume(0);
    this.setTime(undefined);
    this.setLanguage('en')
  }

  setCustomerSettings(volume: number, language = 'en', time?: number) {
    this.setVolume(volume);
    this.setTime(time);
    this.setLanguage(language)
  }

  getVolume() {
    return this.settings.volume
  }

  setVolume(value: number) {
    this.settings.volume = value
    this.saveToLocalStorage()
    console.log(localStorage.getItem('language'))
  }

  getTime() {
    return this.settings.time
  }

  setTime(value?: number) {
    this.settings.time = value
    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  setLanguage(language: string) {
    localStorage.setItem('language', language)
    this.language$.next(language)
  }

  getLanguage() {
    return localStorage.getItem('language') ?? 'en'
  }

  language$ = new BehaviorSubject('en')
}
