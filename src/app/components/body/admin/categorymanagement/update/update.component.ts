import {Component, OnInit, Input} from '@angular/core';
import {CategoryService} from '../../../../../services/crud/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../../../../models/category';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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
    console.log(category.id + '  --------- ' + category.title);
    this.categoryService.updateCategory(category);
  }
}
