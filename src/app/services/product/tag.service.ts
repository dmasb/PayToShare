import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class TagService implements OnInit {

  tags: Observable<Tag[]>;
  tagBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.tagBeingDeleted = null;
  }

  getTagDocReference(tagID: string): DocumentReference {
    return this.afs.doc(`tags/${tagID}`).ref;
    /*this.afs.doc(`tags/{${tagID}`)
      .ref.get().then(doc => {
      if (doc.exists) {
        return doc.ref;
      }
    });*/
  }

  getTags() {
    return this.afs.collection('tags').snapshotChanges();
  }

  addTag(tagName: string) {
    const tag: Tag = {
      name: tagName,
      products: 0,
      created: Timestamp.now()
    };

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

  updateTag(tagID: string, tagName: string) {
    this.afs.doc(`tags/${tagID}`).update({
      name: tagName
    });
  }
}

