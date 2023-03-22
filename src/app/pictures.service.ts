import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import images from './data-eng';
import { QuizType, CategoryItem } from './models/categories-models';
import { PictureItem } from './models/pictures-models';
import { QuestionArtists, QuestionPictures } from './models/question-models';
import { ResultsService } from './results.service';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
    private resultService: ResultsService
  ) { }

  questionsPerGame: number = 3;

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
      const quizResult = this.resultService.getQuizScore(i)
      const isPlayed = this.resultService.isPlayed(i)
      return {
        title: String(i + 1),
        result: quizResult,
        maxScore: 10,
        img: `${PICTURE_URL}${el.imageNum}.jpg`,
        id: i,
        isPlayed: isPlayed
      }
    })
    return categoryData
  }

  getArtistsGame(gameId: number): QuestionArtists[] {
    let quizQuestions: QuestionArtists[] = []
    const questionsPerGame = 3
    quizQuestions = images.slice(gameId * questionsPerGame, (gameId + 1) * questionsPerGame).map((picture) => {
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

  getPicturesGame(gameId: number) {
    let quizQuestions: QuestionPictures[] = []
    let picturesArr = images.slice(images.length / 2, -1)
    quizQuestions = picturesArr.slice(gameId * this.questionsPerGame, (gameId + 1) * this.questionsPerGame).map((picture) => {
      const correctAnswer = Math.floor(Math.random() * 4)
      const answers = this.getImagesAnswers(picture, correctAnswer)
      return {
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
      if (answers[i] === '' && !answers.includes(answer))
        answers[i] = answer
    }
    if (answers.includes('')) {
      answers[answers.indexOf('')] = allOptions[Math.floor(Math.random() * questionArrLength)]
    }
    return answers
  }

  getImagesAnswers(picture: PictureItem, correctAnswer: number) {
    let answers = ['', '', '', '']
    answers[correctAnswer] = `${PICTURE_URL}${picture.imageNum}.jpg`;
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * (images.length - 1))
      const answer = `${PICTURE_URL}${randomNumber}.jpg`;
      if (answers[i] === '' && !answers.includes(answer))
        answers[i] = answer
    }
    if (answers.includes('')) {
      answers[answers.indexOf('')] = `${PICTURE_URL}${Math.floor(Math.random() * (images.length - 1))}.jpg`;
    }
    return answers
  }

  get questionsNumber() {
    return this.questionsPerGame
  }
}
