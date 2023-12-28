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
    private translate: TranslateService
  ) {
    const settingsData = localStorage.getItem('settings')
    if (settingsData) {
      this.settings = JSON.parse(settingsData)
      this.language$.next(this.settings.language)
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

  language$ = new BehaviorSubject('en')

  setLanguage(language: string) {
    localStorage.setItem('language', language)
    this.settings.language = language
    this.language$.next(language)
    this.saveToLocalStorage()
  }

  getLanguage() {
    return localStorage.getItem('language') ?? 'en'
  }

  setTranslation() {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    const language = localStorage.getItem('language' || 'en')
    if (language) {
      this.translate.use(language);
    }
  }
}
