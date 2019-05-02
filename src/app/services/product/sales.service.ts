import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { LicenseService } from './license.service';
import { TagService } from './tag.service';
import { FormatService } from './format.service';
import { map } from 'rxjs/operators';
import { Sale } from '../../models/products/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales: Observable<Sale[]>;
  salesBeingDeleted: string;

  constructor(private afs: AngularFirestore,
    private formatService: FormatService,
    private tagService: TagService,
    private licenseService: LicenseService) {
    this.salesBeingDeleted = null;
  }

  getSales(): Observable<Sale[]> {
    return this.sales = this.afs.collection('sales').snapshotChanges().pipe(
      map(sales => {
        return sales.map(sale => {
          return {
            id: sale.payload.doc.id,
            ...sale.payload.doc.data()
          } as Sale;
        });
      })
    );

  }

  getSalesDoc(saleID: string) {
    return this.afs.doc(`sales/${saleID}`);
  }

  async addSale(saleName: string, licenseID: string, formatID: string, tagID: string) {

    const licenseObj = await this.licenseService.getLicenseJson(licenseID);
    const formatObj = await this.formatService.getFormatJson(formatID);
    const tagObj = await this.tagService.getTagJson(tagID);

    const sale: Sale = {
      name: saleName,
      licenseRef: [
        licenseObj
      ],
      formatRef: [
        formatObj
      ],
      tagRef: [
        tagObj
      ],
      created: Timestamp.now()
    };

    this.afs.collection('sales').add(sale);
  }

  available(saleID: string): boolean {
    if (this.salesBeingDeleted === null) {
      this.salesBeingDeleted = saleID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`sales/${this.salesBeingDeleted}`).delete();
    this.salesBeingDeleted = null;
  }

  cancel() {
    this.salesBeingDeleted = null;
  }

  updateSales(saleID: string, formatReference: DocumentReference, tagReference: DocumentReference) {
    this.afs.doc(`sales/${saleID}`).update({
      formatRef: formatReference,
      tagRef: tagReference
    });
  }



}
