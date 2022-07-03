export interface CategoryItem {
  title: string;
  result: number;
  maxScore: number;
  img: string;
  id: number;
  isPlayed: boolean;
}

export enum QuizType {
  Artists = 'artists',
  Pictures = 'pictures'
}