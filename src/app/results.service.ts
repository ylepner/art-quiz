import { Injectable } from '@angular/core';
import images from './data';
import { AnswerResult, QuizResults } from './models/quiz-results';
import { PicturesService } from './pictures.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizResults: Record<number, QuizResults> = {}

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
    const pictures = this.picturesService.getArtistsGame(quizId)
  }
}

// export interface QuestionArtists {
//   timer?: number,
//   title?: string,
//   img: string,
//   number: number,
//   answers: string[],
//   correctAnswer: number,
//   name: string
//   author: string,
//   year: string
// }
