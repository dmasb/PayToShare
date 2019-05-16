import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {License} from '../../models/products/license';
import {map} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';

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
    this.messageService.add(license.name + ' was successfully added!', alerts.success);
  }

  /**
   * THIS METHOD NEEDS TO BE CHANGED!
   *
   * This method should now look if any user has this license before removal!!!!
   * @param license
   */
  async confirmDelete(license: License) {
    const usedInPlans = await this.afs.collection('plans').ref.where('licenses', 'array-contains', license)
      .get().then(res => {
        return !res.empty as boolean;
      });
    if (usedInPlans) {
      this.messageService.add(license.name + ' is used in a plan, please remove plan first', alerts.danger);
    } else {
      this.afs.collection('licenses').doc(license.id).delete();
      this.messageService.add(license.name + ' was successfully deleted!', alerts.success);
    }
  }
}

