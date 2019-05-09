import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tags: Observable<Tag[]>;
  private tagBeingDeleted: string;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
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
    const usedInSales = await this.afs.collection('sales').ref.where('salesObjectsIDs', '==', tag.id)
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
      this.messageService.add(tag.name + ' is on sale, please remove sale first', alerts.danger);
    } else if (usedInLicenses) {
      this.messageService.add(tag.name + ' is included in a license, remove license first', alerts.danger);
    } else if (usedInProducts) {
      this.messageService.add(tag.name + ' is included in products, remove products tagged with this tag first', alerts.danger);
    } else {
      this.afs.collection('tags').doc(tag.id).delete();
      this.messageService.add(tag.name + ' was successfully removed!', alerts.success);
    }
  }

  updateTag(tag: Tag) {
    this.afs.doc(`tags/${tag.id}`).update({
      name: tag.name
    });
    this.messageService.add(tag.name + ' was successfully updated!', alerts.success);
  }
}


