import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../models/category';
import {CategoryService} from '../../../../../services/crud/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  newCategoryForm = new FormGroup({
    categoryName: new FormControl(''),
  });
  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  addCategory() {
    const category: Category = {title: this.newCategoryForm.controls.categoryName.value};
    this.categoryService.addCategory(category);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addCategoryModal) {
    this.modalService.open(addCategoryModal, {centered: true});
    return false;
  }
}
