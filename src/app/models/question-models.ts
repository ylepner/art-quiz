export interface QuestionArtists {
  timer?: number,
  title?: string,
  img: string,
  number: number,
  answers: string[],
  correctAnswer: string
}

export interface QuestionPictures {
  timer?: number,
  title: string,
  answers: string[],
  correctAnswer: number
}