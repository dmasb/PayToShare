import {Component, OnInit, Input} from '@angular/core';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';

@Component({
  selector: 'app-image-upload-template',
  templateUrl: './image-upload-template.component.html',
  styleUrls: ['./image-upload-template.component.scss']
})
export class ImageUploadTemplateComponent implements OnInit {
  @Input() private percentage: Observable<number>;
  @Input() private snapshot: Observable<UploadTaskSnapshot>;
  @Input() private task: AngularFireUploadTask;
  @Input() private url: url;

  constructor() {
  }

  ngOnInit() {
  }

}
