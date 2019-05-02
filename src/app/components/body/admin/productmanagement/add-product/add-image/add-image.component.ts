import { Component } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent {
  files: File [] = [];

  onDrop(files: FileList){
    for (let i = 0; i < files.length; i++){
      this.files.push(files.item(i));
    }
  }
}
