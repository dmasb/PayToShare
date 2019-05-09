import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Sale} from '../../models/products/sale';
import {SaleType} from '../../models/saleType';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import {Tag} from '../../models/products/tag';
import {Plan} from '../../models/products/plan';

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

  confirmDelete(sale: Sale) {
    this.deleteSale(sale);
  }

  addSale(saleObject: Sale, tags: Tag[]) {

    const objectIDsAlreadyInSale: string[] = [];
    for (const tag of tags) {
      if (tag.salesID !== 'none') {
        objectIDsAlreadyInSale.push(tag.salesID);
      } else {
        saleObject.salesObjectsID = tag.id;
        this.afs.collection('sales').add(Object.assign({}, saleObject)).then(
          sale => {
            this.afs.collection('tags').doc(tag.id).update({salesID: sale.id});
          }
        );
      }
    }
    if (objectIDsAlreadyInSale.length > 0) {
      this.messageService.add('The following objects are already on sale, the rest were added! ' +
        objectIDsAlreadyInSale.toString(), alerts.danger);
    } else {
      this.messageService.add(saleObject.name + ' was successfully added!', alerts.success);
    }
  }

  addPlanSale(saleObject: Sale, plans: Plan[]) {

    const objectIDsAlreadyInSale: string[] = [];
    for (const plan of plans) {
      if (plan.salesID !== 'none') {
        objectIDsAlreadyInSale.push(plan.salesID);
      } else {
        saleObject.salesObjectsID = plan.id;
        this.afs.collection('sales').add(Object.assign({}, saleObject)).then(
          sale => {
            this.afs.collection('plans').doc(plan.id).update({salesID: sale.id});
          }
        );
      }
    }
    if (objectIDsAlreadyInSale.length > 0) {
      this.messageService.add('The following objects are already on sale, the rest were added! ' +
        objectIDsAlreadyInSale.toString(), alerts.danger);
    } else {
      this.messageService.add(saleObject.name + ' was successfully added!', alerts.success);
    }
  }

  private async deleteSale(saleObject: Sale) {

    console.log(saleObject.id);
    await this.afs.collection('sales').doc(saleObject.id).ref.get().then(sale => {
      if (sale.exists) {
        if (saleObject.type === SaleType.TAG) {
          this.afs.collection('tags').doc(saleObject.salesObjectsID).update({salesID: 'none'});
        } else if (saleObject.type === SaleType.PLAN) {
          this.afs.collection('plans').doc(saleObject.salesObjectsID).update({salesID: 'none'});
        }
        sale.ref.delete();
      }
    });
    this.messageService.add(saleObject.name + ' was successfully deleted!', alerts.success);
  }
}
