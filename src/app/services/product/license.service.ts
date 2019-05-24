import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {License} from '../../models/products/license';
import {map} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import * as firebase from 'firebase';
import * as cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private licenses: Observable<License[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  getLicenses(): Observable<License[]> {
    return this.licenses = this.afs.collection('licenses').snapshotChanges().pipe(
      map(licenses => {
        return licenses.map(license => {
          return {
            id: license.payload.doc.id,
            ...license.payload.doc.data()
          } as License;
        });
      })
    );

  }

  addLicense(license: License) {
    this.afs.collection('licenses').add(Object.assign({}, license));
    this.messageService.add(license.title + ' was successfully added!', alerts.success);
  }

  /**
   * THIS METHOD NEEDS TO BE CHANGED!
   *
   * This method should now look if any user has this license before removal!!!!
   * @param license
   */
  async confirmDelete(license: License) {
    const temp = JSON.parse(JSON.stringify(license));
    const usedInPlans = await this.afs.collection('sales').ref.where('saleObjects', 'array-contains', temp)
      .get().then(res => {
        return !res.empty as boolean;
      });
    if (usedInPlans) {
      this.messageService.add(license.title + ' is used in a plan, please remove plan first', alerts.danger);
    } else {
      this.afs.collection('licenses').doc(license.id).delete();
      this.messageService.add(license.title + ' was successfully deleted!', alerts.success);
    }
  }

  update(license: License, newLicense: License) {
    const oldLicense = JSON.parse(JSON.stringify(license));
    this.afs.collection('sales').ref.where('saleObjects', 'array-contains', oldLicense).get()
      .then(res => {
        res.docs.map(docs => {
          docs.ref.update({
            saleObjects: firebase.firestore.FieldValue.arrayRemove(oldLicense)
          });
          const newLic = JSON.parse(JSON.stringify(newLicense));
          docs.ref.update({
            saleObjects: firebase.firestore.FieldValue.arrayUnion(newLic)
          });
        });
      });
    this.afs.collection('licenses').doc(license.id).update(newLicense);
    this.afs.collection('licenses').doc(license.id).update({
      id: firebase.firestore.FieldValue.delete()
    });
  }
}

