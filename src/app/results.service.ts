import { Injectable } from '@angular/core';
import images from './data';
import { AnswerResult, ArtistResult, QuizResults } from './models/quiz-results';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizResults: Record<number, QuizResults> = {}

  constructor(
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

  getArrayOfAllQuizResultsAnswers() {
    const arrays = Object.entries(this.getAllQuizResults())
    let resultsArr: any[] = []
    let questionsArr: AnswerResult[] = []
    arrays.forEach((entry) => {
      resultsArr.push(entry[1].results)
    })
    resultsArr.forEach((el) => el.forEach((question: any) => questionsArr.push(question)))
    return questionsArr
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

  getQuizScore(quizNumber: number) {
    const answersArr = this.quizResults[quizNumber]
    if (!answersArr) {
      return 0
    }
    const correctAnswers = answersArr.results.filter((picture) => picture.isCorrectAnswer === true)
    return correctAnswers.length
  }

  isPlayed(quizNumber: number) {
    return !!this.quizResults[quizNumber]
  }
}