import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { QuizArtistsPageComponent } from './quiz-artists-page/quiz-artists-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PictureInfoDialogComponent } from './picture-info-dialog/picture-info-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { QuizResultsDialogComponent } from './quiz-results-dialog/quiz-results-dialog.component';
import { RoundResultsPageComponent } from './round-results-page/round-results-page.component';
import { QuizPicturesPageComponent } from './quiz-pictures-page/quiz-pictures-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from './pipes/time.pipe';
import { QuitGameDialogComponent } from './quit-game-dialog/quit-game-dialog.component';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SettingsPageComponent,
    FooterComponent,
    CategoriesComponent,
    MenuItemComponent,
    QuizArtistsPageComponent,
    PictureInfoDialogComponent,
    QuizResultsDialogComponent,
    RoundResultsPageComponent,
    QuizPicturesPageComponent,
    TimePipe,
    QuitGameDialogComponent,
    GameOverDialogComponent,
    ScorePageComponent,
    GameFieldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }