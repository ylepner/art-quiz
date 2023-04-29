import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuitGameDialogComponent } from './quit-game-dialog/quit-game-dialog.component';
import { QuizArtistsPageComponent } from './quiz-artists-page/quiz-artists-page.component';
import { QuizPicturesPageComponent } from './quiz-pictures-page/quiz-pictures-page.component';
import { RoundResultsPageComponent } from './round-results-page/round-results-page.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  },
  {
    path: 'categories/:type',
    component: CategoriesComponent
  },
  {
    path: 'quiz/artists/:id',
    component: QuizArtistsPageComponent
  },
  {
    path: 'quiz/pictures/:id',
    component: QuizPicturesPageComponent,
  },
  {
    path: 'quiz/:quizType/:quizId/results',
    component: RoundResultsPageComponent
  },
  {
    path: 'score/:quizType',
    component: ScorePageComponent
  },
  {
    path: 'game',
    component: GameFieldComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
