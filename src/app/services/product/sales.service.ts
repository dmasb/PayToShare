import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Sale} from '../../models/products/sale';
import {SaleType} from '../../models/saleType';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales: Observable<Sale[]>;

  constructor(private afs: AngularFirestore) {
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

  confirmDelete(sale: Sale) {
    this.deleteSale(sale);
  }

  addSale(saleObject: Sale) {
    this.afs.collection('sales').add(Object.assign({}, saleObject)).then(
      sale => {
        if (saleObject.type === SaleType.TAG) {
          saleObject.salesObjectsIDs.forEach(tagID => {
            this.afs.collection('tags').doc(tagID).update({salesID: sale.id});
          });
        } else if (saleObject.type === SaleType.PLAN) {
          saleObject.salesObjectsIDs.forEach(planID => {
            this.afs.collection('plans').doc(planID).update({salesID: sale.id});
          });
        }
      }
    );
  }

  private deleteSale(saleObject: Sale) {

    console.log(saleObject.id);
    this.afs.collection('sales').doc(saleObject.id).ref.get().then(sale => {
      if (sale.exists) {
        if (saleObject.type === SaleType.TAG) {
          saleObject.salesObjectsIDs.forEach(tagID => {
            this.afs.collection('tags').doc(tagID).update({salesID: null});
          });
        } else if (saleObject.type === SaleType.PLAN) {
          saleObject.salesObjectsIDs.forEach(tagID => {
            this.afs.collection('plans').doc(tagID).update({salesID: null});
          });
        }
        sale.ref.delete();
      }
    });
  }
}
