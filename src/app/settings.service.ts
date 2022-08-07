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
    const settingsData = localStorage.getItem('settings')
    if (settingsData) {
      this.settings = JSON.parse(settingsData)
    }
  }

  setDefaultSettings() {
    this.setVolume(0);
    this.setTime(undefined)
  }

  setCustomerSettings(volume: number, time: number) {
    this.setVolume(volume);
    this.setTime(time)
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

  setTime(value: number | undefined) {
    this.settings.time = value
    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }
}
