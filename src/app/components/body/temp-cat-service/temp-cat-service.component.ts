import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { AddCategoryService } from 'src/app/services/crud/add-category.service';

@Component({
  selector: 'app-temp-cat-service',
  templateUrl: './temp-cat-service.component.html',
  styleUrls: ['./temp-cat-service.component.scss']
})
export class TempCatServiceComponent implements OnInit {
  editState: boolean;
  catToEdit: Category;

  cat: Category = {
    title: 'hahahahahahahha'
  }  
  constructor(private CategoryService: AddCategoryService) {   }

  ngOnInit() {
    this.CategoryService.addCategory(this.cat);

    this.CategoryService.getCategories().subscribe( categories => {
      console.log(categories);
    })
  }

  deleteCategory(event, cat: Category){
    this.CategoryService.deleteCategory(cat);
  }

  editCategpry(event, cat: Category){
    this.editState = true;
    this.catToEdit = cat;
  }

  clearStat(){
    this.editState = false;
    this.catToEdit = null;
  }


}
