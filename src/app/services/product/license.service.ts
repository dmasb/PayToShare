import {Injectable, OnInit} from '@angular/core';
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
export class LicenseService implements OnInit {

  licenses: Observable<License[]>;
  licenseBeingDeleted: string;

  constructor(private afs: AngularFirestore,
              private formatService: FormatService,
              private tagService: TagService) {
    this.licenseBeingDeleted = null;
  }

  getLicenseDocRef(licenseID: string): DocumentReference {
    return this.afs.doc(`licenses/${licenseID}`).ref;
  }

  getLicenses(): Observable<License[]> {
    return this.afs.collection('licenses').snapshotChanges().pipe(
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

  addLicense(licenseName: string, formatID: string, tagID: string) {
    const license: License = {
      name: licenseName,
      formatRef: this.formatService.getFormatDocReference(formatID),
      tagRef: this.tagService.getTagDocReference(tagID),
      created: Timestamp.now()
    };

    this.afs.collection('licenses').add(license);
  }

  ngOnInit(): void {
    this.licenses = this.afs.doc<License[]>('licenses').valueChanges();
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

