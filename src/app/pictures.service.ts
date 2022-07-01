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
      const correctAnswer = Math.floor(Math.random() * 4)
      const answers = this.getAnswersOptions(picture, correctAnswer)
      return {
        img: `${PICTURE_URL}${picture.imageNum}.jpg`,
        number: Number(picture.imageNum),
        answers: answers,
        correctAnswer: correctAnswer,
        name: picture.name,
        author: picture.author,
        year: picture.year
      }
    })
    return quizQuestions
  }

  getAllAuthors() {
    const allAuthors = images.map((picture) => picture.author)
    return [...new Set(allAuthors)]
  }

  getAnswersOptions(picture: PictureItem, correctAnswer: number) {
    const allOptions = this.getAllAuthors()
    const questionArrLength = allOptions.length
    let answers = ['', '', '', '']
    answers[correctAnswer] = picture.author
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * questionArrLength)
      const answer = allOptions[randomNumber]
      if (answers[i] === '' && answers[i] !== answer)
        answers[i] = answer
    }
    return answers
  }
}
