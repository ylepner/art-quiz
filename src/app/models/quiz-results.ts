export interface QuizResults {
  quizNumber: number,
  results: AnswerResult[]
}

export interface AnswerResult {
  questionNumber: number,
  isCorrectAnswer: boolean
}