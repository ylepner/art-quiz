import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomePageComponent } from './home-page/home-page.component';
import { QuizArtistsPageComponent } from './quiz-artists-page/quiz-artists-page.component';
import { QuizPicturesPageComponent } from './quiz-pictures-page/quiz-pictures-page.component';
import { RoundResultsPageComponent } from './round-results-page/round-results-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

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
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
