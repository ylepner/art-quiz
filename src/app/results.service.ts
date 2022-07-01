import { Injectable } from '@angular/core';
import { AnswerResult, QuizResults } from './models/quiz-results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  quizResults: Record<number, QuizResults> = {}

  constructor() { }

  setQuizResults(data: QuizResults) {
    this.quizResults[data.quizNumber] = data
  }

  getQuizResults() {
    return this.quizResults
  }
}
