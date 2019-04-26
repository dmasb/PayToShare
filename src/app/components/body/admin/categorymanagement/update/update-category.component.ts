import {Component, OnInit, Input} from '@angular/core';
import {CategoryService} from '../../../../../services/crud/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../../../../models/category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;

  newCategoryNameForm = new FormGroup({
    categoryId: new FormControl(''),
    categoryName: new FormControl('')
  });

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(addCategoryModal) {
    this.modalService.open(addCategoryModal, {centered: true});
  }

  editCategory() {
    const category: Category = {
      id: this.id,
      title: this.newCategoryNameForm.controls.categoryName.value
    };
    this.categoryService.updateCategory(category);
    this.modalService.dismissAll();
  }
}
