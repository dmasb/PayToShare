import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore} from '@angular/fire/firestore';
import {Category} from '../../models/products/category';

@Injectable({
  providedIn: 'root'
})
export class TagService implements OnInit {

  tags: Observable<Tag[]>;
  tagBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
  }

  getTags() {
    return this.afs.collection('tags').snapshotChanges();
  }

  addTag(tag: Tag) {
    this.afs.collection('tags').add(tag);
  }

  ngOnInit(): void {
    this.tags = this.afs.doc<Tag[]>('tags').valueChanges();
  }

  available(tagID: string): boolean {
    if (this.tagBeingDeleted === null) {
      this.tagBeingDeleted = tagID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`tags/${this.tagBeingDeleted}`).delete();
    this.tagBeingDeleted = null;
  }

  cancel() {
    this.tagBeingDeleted = null;
  }

  updateTag(tag: Tag) {
    this.afs.doc(`tags/${tag.id}`).update(tag);
  }
}

