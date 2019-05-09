import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tags: Observable<Tag[]>;
  private tagBeingDeleted: string;

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

  addTag(tag: Tag) {
    this.afs.collection('tags').add(Object.assign({}, tag));
  }

  async confirmDelete(tag: Tag) {
    const usedInSales = await this.afs.collection('sales').ref.where('salesObjectsIDs', 'array-contains', tag.id)
      .get().then(res => {
        console.log(res);
        return !res.empty as boolean;
      });

    const usedInLicenses = await this.afs.collection('licenses').ref.where('tagID', '==', tag.id)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInProducts = await this.afs.collection('products').ref.where('tagIDs', 'array-contains', tag.id)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInSales) {
      console.log('tag is on sale, remove sale first');
    } else if (usedInLicenses) {
      console.log('tag is included in a license, remove license first');
    } else if (usedInProducts) {
      console.log('tag is included in products, remove products tagged with this tag first');
    } else {
      this.afs.collection('tags').doc(tag.id).delete();
    }
  }

  updateTag(tag: Tag) {
    this.afs.doc(`tags/${tag.id}`).update({
      name: tag.name
    });
  }
}


