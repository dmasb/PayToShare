import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Sale} from '../../models/products/sale';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import {SaleType} from '../../models/saleType';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  sales: Observable<Sale[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
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

  getSaleOnType(type: SaleType): Observable<Sale[]> {
    return this.afs.collection('sales', ref =>
      ref.where('type', '==', type)).snapshotChanges().pipe(
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

  addSale(sale: Sale) {
    this.afs.collection('sales').add(Object.assign({}, sale));
    this.messageService.add(sale.name + ' was successfully listed!', alerts.success);
  }

  private async deleteSale(saleObject: Sale) {

    await this.afs.collection('sales').doc(saleObject.id).ref.get().then(sale => {
      if (sale.exists) {
        sale.ref.delete().then(() => {
          this.messageService.add(saleObject.name + ' was successfully deleted!', alerts.success);
        }, () => {
          this.messageService.add(saleObject.name + ' was not found!', alerts.success);
        });
      }
    });
  }
}
