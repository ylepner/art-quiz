import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoundsService } from '../sounds.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    private settingsService: SettingsService
  ) {
    this.settingsService.setTranslation();
  }
}

