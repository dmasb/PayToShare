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
