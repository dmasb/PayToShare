import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Format} from '../../models/products/format';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private formats: Observable<Format[]>;
  private formatBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.formatBeingDeleted = null;
  }

  getFormats(): Observable<Format[]> {
    return this.formats = this.afs.collection('formats').snapshotChanges().pipe(
      map(formats => {
        return formats.map(format => {
          return {
            id: format.payload.doc.id,
            ...format.payload.doc.data()
          } as Format;
        });
      })
    );
  }

  getFormatDoc(formatID: string) {
    return this.afs.doc(`formats/${formatID}`);
  }

  getFormatJson(formatID: string) {
    return this.afs.doc(`formats/${formatID}`).ref.get().then(format => {
      return {
        id: format.id,
        ...format.data()
      } as Format;
    });
  }

  addTag(formatName: string) {

    const format: Format = {
      name: formatName,
      created: Timestamp.now()
    };

    this.afs.collection('formats').add(format);
  }

  available(formatID: string): boolean {
    if (this.formatBeingDeleted === null) {
      this.formatBeingDeleted = formatID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`formats/${this.formatBeingDeleted}`).delete();
    this.formatBeingDeleted = null;
  }

  cancel() {
    this.formatBeingDeleted = null;
  }

  updateFormat(formatID: string, formatName: string) {
    this.afs.doc(`formats/${formatID}`).update({
      name: formatName
    });
  }
}

