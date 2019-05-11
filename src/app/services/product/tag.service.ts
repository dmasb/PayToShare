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

  updateTag(oldTag: Tag, newTag: Tag) {
    this.afs.collection('products').ref.where('tags', 'array-contains', oldTag).get().then(
      res => {
        res.docs.map(product => {
          this.afs.collection('sales').ref.where('saleObjects', 'array-contains', product.data()).get().then(
            found => {
              console.log('ITEM IS ON SALE');
              found.docs.map(sale => {
                console.log('sale before');
                console.log(sale.data());
                sale.ref.update({
                  salesObjects: firebase.firestore.FieldValue.arrayRemove(product.data())
                });
                console.log('pro before ');
                console.log(product.data());
                product.ref.update({
                  tags: firebase.firestore.FieldValue.arrayRemove(oldTag)
                });
                product.ref.update({
                  tags: firebase.firestore.FieldValue.arrayUnion(newTag)
                });
                console.log('pro before ');
                console.log(product.data());
                sale.ref.update({
                  salesObjects: firebase.firestore.FieldValue.arrayUnion(product.data())
                });
                console.log('sale after');
                console.log(sale.data());
              });
          });
        });
        res.docs.map(product => product.ref.update({
          tags: firebase.firestore.FieldValue.arrayRemove(oldTag)
        }));
        res.docs.map(product => product.ref.update({
          tags: firebase.firestore.FieldValue.arrayUnion(newTag)
        }));
      }).then(() => {
      this.afs.collection('licenses').ref.where('tag', '==', oldTag).get().then(
        licenses => {
          licenses.docs.map(license => {
            const ls = {...license.data()} as License;
            console.log(ls);
            /*this.afs.collection('plans').ref.where('licenses', 'array-contains', ls).get().then(
              res => res.docs.map(plan => {
                plan.ref.update({
                  licenses: firebase.firestore.FieldValue.arrayRemove(ls)
                });
                console.log('removed plan license');
                license.ref.update({
                  tag: newTag
                });
                console.log('passed license update');
                const newLi = {
                  id: license.id,
                  ...license.data()
                } as License;
                plan.ref.update({
                  licenses: firebase.firestore.FieldValue.arrayUnion(newLi)
                });
                console.log('added plan license');
              }), () => {
              });*/
            license.ref.update({
              tag: newTag
            });
          });
        }
      ).then(() => {
        this.afs.doc(`tags/${oldTag.id}`).update({name: newTag.name});
        this.messageService.add(oldTag.name + ' was successfully updated!', alerts.success);
      }, () => {
        this.messageService.add(oldTag.name + ' was not updated!', alerts.danger);
      });
    })
    ;
  }
}
