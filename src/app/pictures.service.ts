import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import images from './data';
import { QuizType, CategoryItem } from './models/categories-models';
import { PictureItem } from './models/pictures-models';
import { QuestionArtists, QuestionPictures } from './models/question-models';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
    private route: ActivatedRoute
  ) { }

  getCategories(category: QuizType): CategoryItem[] {
    let data: PictureItem[] = []
    if (category === QuizType.Artists) {
      data = images.slice(0, images.length / 2)
      console.log(data[0])
    }
    if (category === QuizType.Pictures) {
      data = images.slice(images.length / 2, -1)
    }
    const filteredData = data.filter((el, i) => i % 10 === 0)
    const categoryData = filteredData.map((el, i) => {
      return {
        title: String(i + 1),
        result: 0,
        maxScore: 10,
        img: `${PICTURE_URL}${el.imageNum}.jpg`,
        id: i
      }
    })
    return categoryData
  }

  getArtistsGame(gameId: number): QuestionArtists[] {
    let quizQuestions: QuestionArtists[] = []
    quizQuestions = images.slice(gameId * 10, (gameId * 10) + 10).map((picture) => {
      return {
        img: `${PICTURE_URL}${picture.imageNum}.jpg`,
        number: 0,
        answers: [
          'Peter Paul Rubens', 'Rembrandt van Rijn', 'Leonardo da Vinci', 'Hieronymus Bosch'
        ],
        correctAnswer: 2
      }
    })
    return quizQuestions
  }
}
