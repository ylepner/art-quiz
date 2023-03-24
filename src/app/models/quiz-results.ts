import { QuizType } from "./categories-models"

export interface QuizResults {
  quizResultsArtists?: QuizResultsCategory,
  quizResultsPictures?: QuizResultsCategory,
}

export interface QuizResultsCategory {
  quizNumber: number,
  results: AnswerResult[]
}

export interface AnswerResult {
  questionNumber: number,
  isCorrectAnswer: boolean
}

export interface ArtistResult {
  img: string,
  number: number,
  isCorrectAnswer: boolean,
  name: string
  author: string,
  year: string
}