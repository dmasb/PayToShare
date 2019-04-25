import { Component, OnInit } from '@angular/core';
import { ItemService} from "../../../../../services/item/item.service";
// @ts-ignore
import { Item } from "../../../../../models/Item";
// @ts-ignore
import { Item } from "../../../../../models/Item";

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {
  item: Item = {
    title: "",
    description: ""
  };

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }
  onSubmit(){
    if(this.item.title != '' && this.item.description != ''){
      this.itemService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }

}
