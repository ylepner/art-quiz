export interface Question {
  timer?: number,
  title: string,
  img: string,
  number: number,
  answers: string[],
  correctAnswer: number
}