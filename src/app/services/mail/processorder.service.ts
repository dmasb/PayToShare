import {Injectable} from '@angular/core';
import {Email} from '../../models/email';
import {AuthService} from '../authentication/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Cart} from '../../models/products/cart';
import {Order} from '../../models/order';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ProcessorderService {

  constructor(private afAuth: AuthService, private afs: AngularFirestore) {
  }

  private static getEmailObject(user: User): Email {
    const email = new Email();
    email.recipient = user.email;
    email.emailsubject = 'Your Order';
    email.message = 'topkek';
    email.orderid = '123123123';
    email.generateKey();
    return email;
  }


  // TODO: Add order as parameter and replace mock Object.
  processOrder(user: User, cart: Cart) {
    if (user.email) {
      const order = new Order(user.id, Object.assign({}, cart));
      for (const license of cart.licenses) {
        const oldLicense = JSON.parse(JSON.stringify(license.item));
        this.afs.collection('sales').ref.where('saleObjects', 'array-contains', oldLicense)
          .get().then(res => {
          console.log(res.docs);
          res.docs.map(r => {
            r.ref.update({
              saleObjects: firebase.firestore.FieldValue.arrayRemove(oldLicense)
            });
            license.item.quantity -= license.amountOf;
            r.ref.update({
              saleObjects: firebase.firestore.FieldValue.arrayUnion(Object.assign({}, license.item))
            });
          });
        });
        this.afs.collection('licenses').doc(license.item.id).update({
          quantity: firebase.firestore.FieldValue.increment(-license.amountOf)
        });
      }
      this.afs.collection('outgoing_emails').add(Object.assign({}, ProcessorderService.getEmailObject(user)));
      this.afs.collection('orders').add(Object.assign({}, order));
      this.afs.collection('users').doc(user.id).update({
        cart: Object.assign({}, new Cart())
      });
    }
  }

  getOrders(uid: string): Observable<Order[]> {
    return this.afs.collection('orders', ref =>
      ref.where('uid', '==', uid)).snapshotChanges().pipe(
      map(orders => orders.map(order => {
        return {
          id: order.payload.doc.id,
          ...order.payload.doc.data()
        } as Order;
      }))
    );
  }
}
