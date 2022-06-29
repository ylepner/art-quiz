import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PictureInfoDialogComponent } from './picture-info-dialog/picture-info-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SettingsPageComponent,
    FooterComponent,
    CategoriesComponent,
    MenuItemComponent,
    QuizPageComponent,
    PictureInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
