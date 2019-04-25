import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../models/category';
import {CategoryService} from '../../../../../services/crud/category.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  newCategoryForm = new FormGroup({
    categoryName: new FormControl(''),
  });
  closeResult: string;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  addCategory() {
    const category: Category = {title: this.newCategoryForm.controls.categoryName.value};
    this.categoryService.addCategory(category);
  }

  openCenteredDialog(addCategoryModal) {
    this.modalService.open(addCategoryModal, {centered: true});
  }
}
