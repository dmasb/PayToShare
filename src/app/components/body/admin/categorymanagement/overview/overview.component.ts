import { Component, OnInit } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {CategoryService} from '../../../../../services/crud/category.service';
import {Category} from '../../../../../models/category';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {

  categories: Category[];
  closeResult: string;
  newCategoryForm = new FormGroup({
    categoryName: new FormControl(''),
  });
  activeCategory: Category;

  constructor(pipe: DecimalPipe, private categoryService: CategoryService, private modalService: NgbModal) {
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

  openCenteredDialog(dialog) {
    this.modalService.open(dialog, {centered: true});
  }

  addCategory() {
    this.activeCategory = {title: this.newCategoryForm.controls.categoryName.value};
    this.categoryService.addCategory(this.activeCategory);
    this.activeCategory = null;
  }

  requestCategoryDelete(categoryId) {
    this.categoryService.available(categoryId);
  }

  confirmDelete() {
    this.categoryService.remove();
  }

  cancelDelete() {
    this.categoryService.cancel();
  }

  editCategory() {

  }
}
