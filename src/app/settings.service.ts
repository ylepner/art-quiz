import { Injectable } from '@angular/core';
import { Settings } from './models/settings-models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings = {
    volume: 0,
    time: 10
  }

  constructor() {

  }

  setDefaultSettings() {
    this.settings.volume = 0;
    this.settings.time = undefined
  }

  getVolume() {
    return this.settings.volume
  }

  setVolume(value: number) {
    this.settings.volume = value
    this.saveToLocalStor()
  }

  getTime() {
    return this.settings.time
  }

  setTime(value: number | undefined) {
    this.settings.time = value
    this.saveToLocalStor()
  }

  private saveToLocalStor() {
    //localStorage.setItem('settings', this.settings)
  }
}
