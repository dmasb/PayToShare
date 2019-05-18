import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import * as firebase from 'firebase';
import {SaleType} from '../../models/saleType';
import {Sale} from '../../models/products/sale';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  getProducts(): Observable<Product[]> {
    return this.products = this.afs.collection('products').snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        });
      })
    );
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

  async addProduct(product: Product) {
    await this.afs.collection('products').add(Object.assign({}, product));
    this.messageService.add(product.title + ' was successfully added!', alerts.success);
  }

  async confirmDelete(product: Product) {
    await this.afs.collection('sales').ref.where('saleObjects', 'array-contains', product).get().then(
      res => {
        if (!res.empty) {
          this.messageService.add(product.title + ' is on sale!', alerts.danger);
        } else {
          this.afs.collection('products').doc(product.id).delete();
          this.messageService.add(product.title + ' was successfully deleted!', alerts.success);
        }
      }
    );
  }

  async update(oldProduct: Product, newProduct: Product) {
    await this.afs.collection('sales').ref.where('saleObjects', 'array-contains', oldProduct).get().then(
      res => {
        if (!res.empty) {
          res.docs.map(products => {
            products.ref.update({
              saleObjects: firebase.firestore.FieldValue.arrayRemove(oldProduct)
            });
            products.ref.update({
              saleObjects: firebase.firestore.FieldValue.arrayUnion(newProduct)
            });
          });
          this.afs.collection('products').doc(oldProduct.id).update(Object.assign({}, newProduct));
          this.messageService.add(oldProduct.title + ' was successfully edited in sales as well', alerts.success);
        } else {
          this.afs.collection('products').doc(oldProduct.id).update(Object.assign({}, newProduct));
          this.messageService.add(oldProduct.title + ' was successfully edited!', alerts.success);
        }
      }
    );
  }
}
