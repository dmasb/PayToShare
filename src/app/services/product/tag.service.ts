import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import * as firebase from 'firebase';
import * as cloneDeep from 'lodash/cloneDeep';
import {License} from '../../models/products/license';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tags: Observable<Tag[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
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

    const usedInLicenses = await this.afs.collection('licenses').ref.where('tag', '==', tag)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInProducts = await this.afs.collection('products').ref.where('tags', 'array-contains', tag)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInLicenses) {
      this.messageService.add(tag.name + ' is included in a license, remove license first', alerts.danger);
    } else if (usedInProducts) {
      this.messageService.add(tag.name + ' is included in products, remove products tagged with this tag first', alerts.danger);
    } else {
      this.afs.collection('tags').doc(tag.id).delete();
      this.messageService.add(tag.name + ' was successfully removed!', alerts.success);
    }
  }

  async updateTag(oldTag: Tag, newTag: Tag) {
    console.log(oldTag);
    console.log(newTag);
    const usedInProducts = await this.afs.collection('products').ref.where('tags', 'array-contains', oldTag)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInLicenses = await this.afs.collection('licenses').ref.where('tag', '==', oldTag)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInLicenses) {
      this.messageService.add(oldTag.name + ' is included in a license, remove license first', alerts.danger);
    } else if (usedInProducts) {
      this.messageService.add(oldTag.name + ' is included in products, remove products tagged with this tag first', alerts.danger);
    } else {
      this.afs.collection('tags').doc(oldTag.id).update({
        name: newTag.name
      });
      this.messageService.add(oldTag.name + ' was successfully removed!', alerts.success);
    }
  }
}
