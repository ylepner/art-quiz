import { Injectable } from '@angular/core';
import images from './data';
import { QuestionArtists } from './models/question-models';
import { AnswerResult, ArtistResult, QuizResults } from './models/quiz-results';
import { PicturesService } from './pictures.service';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizResults: Record<number, QuizResults> = {}
  currentQuizResult: QuestionArtists[] = []

  constructor(
    private picturesService: PicturesService
  ) {
    const data = localStorage.getItem('results')
    if (data) {
      this.quizResults = JSON.parse(data)
    }
  }

  setQuizResults(data: QuizResults) {
    this.quizResults[data.quizNumber] = data
    localStorage.setItem('results', JSON.stringify(this.quizResults))
  }

  getAllQuizResults() {
    return this.quizResults
  }

  getQuizResult(quizId: number) {
    const quizResult = this.quizResults[quizId]
    const artistsResults = quizResult.results.map((picture) => {
      return this.convertResultItemToArtistResult(picture)
    })
    return artistsResults
  }

  convertResultItemToArtistResult(item: AnswerResult): ArtistResult {
    const picture = images[item.questionNumber]
    return {
      img: `${PICTURE_URL}${picture.imageNum}.jpg`,
      number: item.questionNumber,
      isCorrectAnswer: item.isCorrectAnswer,
      name: picture.name,
      author: picture.author,
      year: picture.year
    }
  }
}