import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {License} from '../../models/products/license';
import {TagService} from './tag.service';
import {FormatService} from './format.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  licenses: Observable<License[]>;
  licenseBeingDeleted: string;

  constructor(private afs: AngularFirestore,
              private formatService: FormatService,
              private tagService: TagService) {
    this.licenseBeingDeleted = null;
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

  getLicenseDoc(licenseID: string) {
    return this.afs.doc(`licenses/${licenseID}`);
  }

  async addLicense(licenseName: string, formatID: string, tagID: string) {
    const formatObj = await this.formatService.getFormatDoc(formatID).ref.get().then(format => {
      return format.data();
    });

    const tagObj = await this.tagService.getTagDoc(tagID).ref.get().then(format => {
      return format.data();
    });

    const license: License = {
      name: licenseName,
      formatRef: [
        formatObj
      ],
      tagRef: [
        tagObj
      ],
      created: Timestamp.now()
    };

    this.afs.collection('licenses').add(license);
  }

  available(licenseID: string): boolean {
    if (this.licenseBeingDeleted === null) {
      this.licenseBeingDeleted = licenseID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`licenses/${this.licenseBeingDeleted}`).delete();
    this.licenseBeingDeleted = null;
  }

  cancel() {
    this.licenseBeingDeleted = null;
  }

  updateLicense(licenseID: string, formatReference: DocumentReference, tagReference: DocumentReference) {
    this.afs.doc(`licenses/${licenseID}`).update({
      formatRef: formatReference,
      tagRef: tagReference
    });
  }
}

