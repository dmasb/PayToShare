import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {CategoryService} from '../../../../../services/crud/category.service';
import {Category} from '../../../../../models/category';

@Component({
  selector: 'app-overview-category',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})

export class CategoryOverviewComponent implements OnInit {

  categories: Category[];
  activeCategory: Category;

  constructor(pipe: DecimalPipe, private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = category.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Category;
      });
    });
    this.activeCategory = null;
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = category.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Category;
      });
    });
  }
}
