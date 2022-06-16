import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input()
  items?: MenuItem[] | null = [{
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/90.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/105.jpg',
    result: '0/10'
  },
  {
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/94.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/10.jpg',
    result: '0/10'
  },
  {
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/9.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/10.jpg',
    result: '0/10'
  },
  {
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/50.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/150.jpg',
    result: '0/10'
  },
  {
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/90.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/115.jpg',
    result: '0/10'
  },
  {
    title: 'Category 5',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/11.jpg',
    result: '2/10'
  },
  {
    title: 'Category 10',
    img: 'https://raw.githubusercontent.com/ylepner/image-data/master/img/4.jpg',
    result: '0/10'
  },
  ];

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['home'])
  }

  goToSettings() {
    this.router.navigate(['settings'])
  }
}
