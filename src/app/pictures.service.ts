import { Injectable } from '@angular/core';
import images from './data';
import { Category, CategoryItem } from './models/categories-models';
import { PictureItem } from './models/pictures-models';

const PICTURE_URL = 'https://raw.githubusercontent.com/ylepner/image-data/master/img/'

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
  ) { }

  getCategories(category: Category): CategoryItem[] {
    let data: PictureItem[] = []
    if (category === Category.Artists) {
      data = images.slice(0, images.length / 2)
    }
    if (category === Category.Pictures) {
      data = images.slice(images.length / 2, -1)
    }
    const filteredData = data.filter((el, i) => i % 10 === 0)
    const categoryData = filteredData.map((el, i) => {
      return {
        title: String(i + 1),
        result: 0,
        maxScore: 10,
        img: `${PICTURE_URL}${el.imageNum}.jpg`
      }
    })
    return categoryData
  }
}