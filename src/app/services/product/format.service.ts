import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Format} from '../../models/products/format';
import {map} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  private formats: Observable<Format[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
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
    this.messageService.add(format.name + ' was successfully added!', alerts.success);
  }


  async confirmDelete(format: Format) {

    const usedInProducts = await this.afs.collection('products').ref.where('format', '==', format)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInLicenses = await this.afs.collection('licenses').ref.where('format', '==', format)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInProducts) {
      this.messageService.add(format.name + ' is used in products', alerts.danger);
    } else if (usedInLicenses) {
      this.messageService.add(format.name + ' is used in licenses', alerts.danger);
    } else {
      this.afs.collection('formats').doc(format.id).delete();
      this.messageService.add(format.name + ' was successfully deleted!', alerts.success);
    }
  }

  async updateFormat(oldFormat: Format, newFormat: Format) {

    const usedInProducts = await this.afs.collection('products').ref.where('format', '==', oldFormat)
      .get().then(res => {
        return !res.empty as boolean;
      });

    const usedInLicenses = await this.afs.collection('licenses').ref.where('format', '==', oldFormat)
      .get().then(res => {
        return !res.empty as boolean;
      });

    if (usedInProducts) {
      this.messageService.add(oldFormat.name + ' is used in products', alerts.danger);
    } else if (usedInLicenses) {
      this.messageService.add(oldFormat.name + ' is used in licenses', alerts.danger);
    } else {
      this.afs.collection('formats').doc(oldFormat.id).update({
        name: newFormat.name
      });
      this.messageService.add(oldFormat.name + ' was successfully deleted!', alerts.success);
    }
  }
}

