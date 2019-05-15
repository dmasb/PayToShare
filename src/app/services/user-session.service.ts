import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {IUser, User} from '../models/user';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Cart, ICart} from '../models/products/cart';
import {Product} from '../models/products/product';

@Injectable({
  providedIn: 'root'
})

export class UserSessionService implements OnInit {

  private user$: Observable<IUser>;
  private userID;
  private collection;
  private cart: Cart = new Cart();

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.userID = this.afAuth.auth.currentUser.uid;
    this.collection = this.afs.collection('users');
    this.currentUser();
  }

  currentUser(): Observable<IUser> {
    if (this.afAuth.auth.currentUser) {
      this.userID = this.afAuth.auth.currentUser.uid;
      // We make a new fetch of the user document to avoid type-casting from IUser to observable<IUser>
      this.user$ = this.afs.doc<IUser>(`users/${this.userID}`).valueChanges();
      return this.user$;
    }
    return null;
  }

  addToCart(product: Product) {
    this.cart.add(product);
    this.updateCart().then(() => console.log('Cart updated.'));
    console.log(this.cart);
  }
  removeFromCart(product: Product){
    this.cart.remove(product);
    this.updateCart().then(() => console.log('Cart updated.'));
    console.log(this.cart);
  }
  removeAllOfProduct(product: Product){
    this.cart.removeAllOf(product);
    this.updateCart().then(() => console.log('Cart updated.'));
    console.log(this.cart);
  }

  updateUser(updatedUser: IUser): boolean {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${this.userID}`);
    userRef.ref.get().then(userDocument => {
      if (userDocument.exists) {
        userRef.update(Object.assign({}, updatedUser));
        return true;
      }
    });
    return false;
  }

  async updateCart() {
    const userRef: AngularFirestoreDocument<IUser> = await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`);
    await userRef.update({cart: Object.assign({}, <ICart>this.cart)});
  }

  getCart(){
    return this.cart;
  }
}
