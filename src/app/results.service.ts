import { Injectable } from '@angular/core';
import imagesRus from './data-eng';
import imagesEng from './data';
import { QuizType } from './models/categories-models';
import { AnswerResult, ArtistResult, QuizResults, QuizResultsCategory } from './models/quiz-results';
import { PictureItem } from './models/pictures-models';
import { SettingsService } from './settings.service';
import { Subscription, map } from 'rxjs';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizCategoryResults: Record<number, QuizResults> = {}
  quizResults?: QuizResults
  results: { [p in QuizType]?: Record<number, AnswerResult[]> } = {}
  images: PictureItem[] = []
  language = ''

  images$ = this.settingsService.language$.pipe(map((value) => {
    if (value === 'en') {
      return imagesEng
    } else {
      return imagesRus
    }
  }))

  subscription: Subscription;

  constructor(
    private settingsService: SettingsService
  ) {
    const data = localStorage.getItem('results')
    if (data) {
      this.results = JSON.parse(data)
    }
    this.subscription = this.images$.subscribe((images) => this.images = images)
  }

  setQuizResults(quizType: QuizType, data: QuizResultsCategory) {
    const results = this.results[quizType] || {}
    results[data.quizNumber] = data.results
    this.results[quizType] = results
    localStorage.setItem(`results`, JSON.stringify(this.results))
  }

  getCategoryResults(quizType: QuizType) {
    let results: Record<number, AnswerResult[]> | undefined
    if (quizType === 'artists') {
      results = this.results.artists
    } else {
      results = this.results.pictures
    }
    if (results) {
      const arrays = Object.entries(results)
      let resultsArr: ArtistResult[] = []
      let correctAnswers = []
      arrays.forEach((entry) => entry[1].forEach((answer) => {
        if (answer.isCorrectAnswer) {
          correctAnswers.push(answer)
        }
        resultsArr.push(this.convertResultItemToArtistResult(answer))
      }))
      return { results: resultsArr, correctAnswers: correctAnswers.length, total: resultsArr.length }
    }
    return { results: [], correctAnswers: 0, total: 0 }
  }

  getQuizResult(quizId: number, category: QuizType) {
    if (category === 'artists') {
      if (this.results.artists) {
        return this.results['artists'][quizId]
      }
    } else {
      if (this.results.pictures) {
        return this.results['pictures'][quizId]
      }
    }
    return []
  }

  convertResultItemToArtistResult(item: AnswerResult): ArtistResult {
    const picture = this.images[item.questionNumber]
    return {
      img: `${PICTURE_URL}${picture.imageNum}.jpg`,
      number: item.questionNumber,
      isCorrectAnswer: item.isCorrectAnswer,
      name: picture.name,
      author: picture.author,
      year: picture.year
    }
  }

  getQuizScore(quizNumber: number, category: QuizType) {
    const answersArr = this.results[category]?.[quizNumber]
    if (!answersArr) {
      return null
    }
    const correctAnswers = answersArr.filter((picture) => picture.isCorrectAnswer === true)
    return { correctAnswers: correctAnswers.length, total: answersArr.length }
  }

  isPlayed(quizNumber: number, category: QuizType) {
    return this.getQuizScore(quizNumber, category) !== null
  }
}