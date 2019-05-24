import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Sale} from '../../models/products/sale';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import {SaleType} from '../../models/saleType';
import {firestore} from 'firebase/app';
import {Plan} from '../../models/products/plan';
import Timestamp = firestore.Timestamp;
import {License} from '../../models/products/license';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales: Observable<Sale[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  getAllSales(): Observable<Sale[]> {
    return this.afs.collection('sales').snapshotChanges().pipe(
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

  getSales(): Observable<Sale[]> {
    const currentTimestamp = Timestamp.now();
    return this.afs.collection('sales', ref =>
      ref.where('begins', '<=', currentTimestamp)).snapshotChanges().pipe(
      map(sales => {
        return sales.map(sale => {
          return {
            id: sale.payload.doc.id,
            ...sale.payload.doc.data()
          } as Sale;
        }).filter(sale => sale.ends >= currentTimestamp);
      })
    );
  }

  getSaleOnType(type: SaleType): Observable<Sale[]> {
    const currentTimestamp = Timestamp.now();
    return this.afs.collection('sales', ref =>
      ref
        .where('type', '==', type)
        .where('begins', '<=', currentTimestamp)).snapshotChanges().pipe(
      map(sales => {
        return sales.map(sale => {
          return {
            id: sale.payload.doc.id,
            ...sale.payload.doc.data()
          } as Sale;
        }).filter(sale => sale.ends >= currentTimestamp);
      })
    );
  }

  confirmDelete(sale: Sale) {
    this.deleteSale(sale);
  }

  addSale(sale: Sale) {
    if (sale.type === SaleType.PLAN) {
      const plans = sale.saleObjects as Plan[];
      for (const plan of plans) {
        this.afs.collection('plans').doc(plan.id).update({
          salePrice: plan.price - (plan.price * (sale.discount / 100))
        });
        plan.salePrice = plan.price - (plan.price * (sale.discount / 100));
      }
      sale.saleObjects = plans;
    } else if (sale.type === SaleType.LICENSE) {
      const licenses = sale.saleObjects as License[];
      for (const license of licenses) {
        this.afs.collection('licenses').doc(license.id).update({
          salePrice: license.price - (license.price * (sale.discount / 100))
        });
        license.salePrice = license.price - (license.price * (sale.discount / 100));
      }
      sale.saleObjects = licenses;
    }
    this.afs.collection('sales').add(Object.assign({}, sale));
    this.messageService.add(sale.name + ' was successfully listed!', alerts.success);
  }

  private async deleteSale(saleObject: Sale) {

    await this.afs.collection('sales').doc(saleObject.id).ref.get().then(sale => {
      if (sale.exists) {
        sale.ref.delete().then(() => {
          if (saleObject.type === SaleType.PLAN) {
            const plans = saleObject.saleObjects as Plan[];
            for (const plan of plans) {
              this.afs.collection('plans').doc(plan.id).update({
                salePrice: 0
              });
            }
          } else if (saleObject.type === SaleType.LICENSE) {
            const licenses = saleObject.saleObjects as License[];
            for (const license of licenses) {
              this.afs.collection('licenses').doc(license.id).update({
                salePrice: 0
              });
            }
          }
          this.messageService.add(saleObject.name + ' was successfully deleted!', alerts.success);
        }, () => {
          this.messageService.add(saleObject.name + ' was not found!', alerts.success);
        });
      }
    });
  }
}
