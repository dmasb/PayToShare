import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Format} from '../../models/products/format';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private formats: Observable<Format[]>;
  private formatBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
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

  addFormat(format: Format) {

    this.afs.collection('formats').add(Object.assign({}, format));
  }


  async confirmDelete(format: Format) {

    const usedInProducts = await this.afs.collection('products').ref.where('formatID', '==', format.id)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInLicenses = await this.afs.collection('licenses').ref.where('formatID', '==', format.id)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInProducts) {
      console.log('Format is used in products');
    } else if (usedInLicenses) {
      console.log('Format is used in licenses');
    } else {
      this.afs.collection('formats').doc(format.id).delete();
    }
  }

  cancel() {
    this.formatBeingDeleted = null;
  }

  updateFormat(format: Format) {
    this.afs.doc(`formats/${format.id}`).update({
      name: format.name
    });
  }
}

