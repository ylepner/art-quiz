import { Injectable } from '@angular/core';
import images from './data-eng';
import { QuizType } from './models/categories-models';
import { AnswerResult, ArtistResult, QuizResults, QuizResultsCategory } from './models/quiz-results';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'
@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizCategoryResults: Record<number, QuizResults> = {}
  quizResults?: QuizResults

  results: { [p in QuizType]?: Record<number, AnswerResult[]> } = {}

  constructor(
  ) {
    const data = localStorage.getItem('results')
    if (data) {
      this.results = JSON.parse(data)
    }
  }

  setQuizResults(quizType: QuizType, data: QuizResultsCategory) {
    const results = this.results[quizType] || {}
    results[data.quizNumber] = data.results
    this.results[quizType] = results
    localStorage.setItem(`results`, JSON.stringify(this.results))
  }

  getAllQuizResults() {
    console.log(`getAllQuizResults`, this.results)
    return this.results
  }

  // getArtistsResult() {
  //   return this.quizResultsArtists
  // }

  // getPicturesResult() {
  //   return this.quizResultsPictures
  // }

  // getArrayOfAllQuizResultsAnswers() {
  //   const arrays = Object.entries(this.getAllQuizResults())
  //   let resultsArr: any[] = []
  //   let questionsArr: AnswerResult[] = []
  //   arrays.forEach((entry) => {
  //     resultsArr.push(entry[1].categoryResults.results)
  //   })
  //   resultsArr.forEach((el) => el.forEach((question: any) => questionsArr.push(question)))
  //   return questionsArr
  // }


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

  getQuizScore(quizNumber: number, category: QuizType) {
    const answersArr = this.results[category]?.[quizNumber]
    if (!answersArr) {
      return null
    }
    const correctAnswers = answersArr.filter((picture) => picture.isCorrectAnswer === true)
    return correctAnswers.length
  }

  isPlayed(quizNumber: number, category: QuizType) {
    return this.getQuizScore(quizNumber, category) !== null
  }
}