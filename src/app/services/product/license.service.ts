import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {License} from '../../models/products/license';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private licenses: Observable<License[]>;

  constructor(private afs: AngularFirestore) {
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
  }

  confirmDelete(license: License) {
    const usedInPlans = this.afs.collection('plans').ref.where('licenseIDs', 'array-contains', license.id)
      .get().then(res => {
        return !res.empty as boolean;
      });
    if (usedInPlans) {
      console.log('License is used in a plan, please remove plan first');
    } else {
      this.afs.collection('licenses').doc(license.id).delete();
    }
  }
}

