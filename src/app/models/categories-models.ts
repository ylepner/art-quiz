
export interface CategoryItem {
  title: string;
  result: number;
  maxScore: number;
  img: string;
  id: number;
  isPlayed: boolean;
}

export const quizTypes = ['artists', 'pictures'] as const;
export type QuizType = (typeof quizTypes)[number]
