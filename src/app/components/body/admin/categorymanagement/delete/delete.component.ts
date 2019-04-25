import {Component, OnInit, Input} from '@angular/core';
import {CategoryService} from '../../../../../services/crud/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteModal) {
    this.modalService.open(confirmDeleteModal, {centered: true});
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
}
