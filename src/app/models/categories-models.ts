export interface CategoryItem {
  title: string;
  result: number;
  maxScore: number;
  img: string;
  id: number;
}

export enum QuizType {
  Artists = 'artists',
  Pictures = 'pictures'
}