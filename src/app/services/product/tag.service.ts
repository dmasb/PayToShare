import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tags: Observable<Tag[]>;
  tagBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.tagBeingDeleted = null;
  }

  getTags(): Observable<Tag[]> {
    return this.tags = this.afs.collection('tags').snapshotChanges().pipe(
      map(tags => {
        return tags.map(tag => {
          return {
            id: tag.payload.doc.id,
            ...tag.payload.doc.data()
          } as Tag;
        });
      })
    );
  }

  getTagDoc(tagID: string) {
    return this.afs.doc(`tags/${tagID}`);
  }

  addTag(tagName: string) {
    const tag: Tag = {
      name: tagName,
      products: 0,
      created: Timestamp.now()
    };

    this.afs.collection('tags').add(tag);
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

