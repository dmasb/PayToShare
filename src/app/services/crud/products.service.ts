import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Tag} from '../../models/products/tag';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private products: Observable<Product[]>;
  private productBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.productBeingDeleted = null;
  }

  getProductsDashboard(n: number): Observable<Product[]> {
    if (n === 0) {
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
    // tslint:disable-next-line:triple-equals
    if (n === 1) {
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
    if (n == 2) {
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
    } else {
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
  }

  getProducts(): Observable<Product[]> {
    return this.products = this.afs.collection('products', ref => ref.where('quantity', '>', '0')).snapshotChanges().pipe(
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

  getSalesItems(): Observable<Product[]> {
    return this.products = this.afs.collection('products').snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(s => s.tags.find(tag => tag.name === 'Deal of the Day'));
      })
    );
  }

  getRegularItems(): Observable<Product[]> {
    return this.products = this.afs.collection('products').snapshotChanges().pipe(
      map(products => {
        return products.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as Product;
        }).filter(s => s.tags.every(o => o.name !== 'Deal of the Day'));
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
      } as Product;
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

  markAsDeals(productIDs: string[]) {
    productIDs.forEach(id => {
      this.afs.collection('products').doc(id).update({test: 'testing'});
    });

    productIDs.forEach(id => {
      const product = this.getTagJson(id);
      product.then(s => {
        if (s.tags.findIndex(res => res.name === 'Deal of the Day') === -1) {
          const tag: Tag = {
            name: 'Deal of the Day',
            products: 0,
            created: Timestamp.now()
          };
          s.tags.push(tag);
          this.afs.collection('products').doc(id).update({
            tags: s.tags
          });
        }
      });
    });
  }
}
