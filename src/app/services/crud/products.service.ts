import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../models/products/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private productBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.productBeingDeleted = null;
  }

  getAdminProducts(){
    return this.afs.collection('products').snapshotChanges();
  }

  getProducts() {
    return this.afs.collection('products', ref =>ref.where('quantity','>','0')).snapshotChanges();
  }

  addProduct(product: Product) {
    this.afs.collection('products').add(product);

  }

  delete(id: string) {
    this.afs.doc(`products/${id}`).delete();
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
