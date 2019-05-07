import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;
  private productBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.productBeingDeleted = null;
  }

  getProductsDashboard(): Observable<Product[]>{
    return this.products = this.afs.collection('products', ref => ref.orderBy('price')).snapshotChanges().pipe(
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
  sortByPrice(): Observable<Product[]>{
    return this.products = this.afs.collection('products', ref => ref.orderBy('price')).snapshotChanges().pipe(
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
  sortByTitle(): Observable<Product[]>{
    return this.products = this.afs.collection('products', ref => ref.orderBy('title')).snapshotChanges().pipe(
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
  sortByQuantity(): Observable<Product[]>{
    return this.products = this.afs.collection('products', ref => ref.orderBy('quantity')).snapshotChanges().pipe(
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

  getProducts(): Observable<Product[]> {
    return this.products = this.afs.collection('products',ref => ref.where('quantity','>','0')).snapshotChanges().pipe(
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
  getProductsByTag(filter: string): Observable<Product[]> {
    return this.products = this.afs.collection('products', ref =>
      ref.where('tags', 'array-contains', `${filter}`)).snapshotChanges().pipe(
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

  getProductDoc(productID: string) {
    return this.afs.doc(`products/${productID}`);
  }

  getTagJson(productID: string) {
    return this.afs.doc(`products/${productID}`).ref.get().then(product => {
      return {
        id: product.id,
        ...product.data()
      };
    });
  }


  addProduct(product: Product) {
    this.afs.collection('products').add(product);
  }

  available(productId: string): boolean {
    if (this.productBeingDeleted === null) {
      this.productBeingDeleted = productId;
      return true;
    } else {
      return false;
    }
  }
  remove() {
    this.afs.doc(`products/${this.productBeingDeleted}`).delete();
    this.productBeingDeleted = null;
  }

  cancel() {
    this.productBeingDeleted = null;
  }

  update(product: Product) {
    this.afs.doc(`products/${product.id}`).update(product);
  }
}
