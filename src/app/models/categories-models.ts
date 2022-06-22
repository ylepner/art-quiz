export interface CategoryItem {
  title: string;
  result: number;
  maxScore: number;
  img: string;
}

export enum Category {
  Artists = 'artists',
  Pictures = 'pictures'
}