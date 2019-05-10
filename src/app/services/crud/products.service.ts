import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import {Plan} from '../../models/products/plan';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  /*
  to be fixed {Suitable for the search by tag functionality]
   */
  getProductsByTag(tags: string[]): Observable<Product[]> {
    return this.products = this.afs.collection('products').snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(
          product => (tags.length > 0) ? tags.includes(product.id) : true
        );
      })
    );
  }

  // Temporary
  getSaleProducts(): Observable<Product[]> {
    return this.afs.collection('products').snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(product => product.tagIDs.filter(res => {
          return this.afs.collection('sales').ref.where('salesObjectsID', '==', res).get().then(
            r => {
              return res;
            }
          );
        }));
      })
    );
  }

  async addProduct(product: Product) {
    await this.afs.collection('products').add(Object.assign({}, product));
    this.messageService.add(product.title + ' was successfully added!', alerts.success);
  }


  async confirmDelete(product: Product) {
    await this.afs.collection('products').doc(product.id).delete();
    this.messageService.add(product.title + ' was successfully deleted!', alerts.success);
  }

  async update(product: Product) {
    await this.afs.collection('products').doc(product.id).update(Object.assign({}, product));
    this.messageService.add(product.title + ' was successfully edited!', alerts.success);
  }

}
