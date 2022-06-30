export interface QuestionArtists {
  timer?: number,
  title?: string,
  img: string,
  number: number,
  answers: string[],
  correctAnswer: number,
  name: string
  author: string,
  year: string
}
export interface QuestionPictures {
  timer?: number,
  title: string,
  answers: string[],
  correctAnswer: number
}