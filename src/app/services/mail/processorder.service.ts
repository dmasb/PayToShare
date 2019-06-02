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
import {LicenseSubscription, PlanSubscription} from '../../models/subscription';
import {firestore} from 'firebase/app';
import {MessageService} from '../message.service';
import {ICartItem} from '../../models/products/ICartItem';
import {alerts} from '../../models/alerts';
import Timestamp = firestore.Timestamp;
import {License} from '../../models/products/license';

@Injectable({
  providedIn: 'root'
})
export class ProcessorderService {

  constructor(private afAuth: AuthService,
              private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  private static getEmailObject(user: User): Email {
    const email = new Email();
    email.recipient = user.email;
    email.emailsubject = 'Your Order';
    email.message = 'topkek';
    email.orderid = '123123123';
    email.activationKey = email.generateKey();
    email.created = Timestamp.now();
    email.hash = email.generateHash(email.activationKey);
    return email;
  }


  async processOrder(user: User, cart: Cart): Promise<boolean> {
    if (user.email) {
      const order = new Order(user.id, Object.assign({}, cart));
      const unavailableLicenses: ICartItem[] = [];
      for (const license of cart.licenses) {
        await this.afs.collection('licenses').doc(license.item.id)
          .ref.get().then(ls => {
            const t = {
              id: ls.id,
              ...ls.data()
            } as License;
            if (t.quantity < license.amountOf) {
              license.item.quantity = t.quantity;
              unavailableLicenses.push(license);
              console.log(t);
            }
          });
      }

      if (unavailableLicenses.length === 0) {
        if (cart.plan) {
          const planSub = new PlanSubscription(
            user.id,
            cart.plan.id,
            cart.plan,
            Timestamp.fromMillis(Timestamp.now().toMillis() + 2592000000));
          this.afs.collection('plan_subscriptions').ref
            .where('userID', '==', user.id).get().then(res => {
            if (res.empty) {
              this.afs.collection('plan_subscriptions').add(Object.assign({}, planSub));
            } else {
              res.docs.map(document => {
                document.ref.update(Object.assign({}, planSub));
              });
            }
          });
        }
        for (const license of cart.licenses) {
          const oldLicense = JSON.parse(JSON.stringify(license.item));
          this.afs.collection('sales').ref.where('saleObjects', 'array-contains', oldLicense)
            .get().then(res => {
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

          const licenseSub = new LicenseSubscription(
            user.id,
            license.item.id,
            license.item,
            Timestamp.fromMillis(Timestamp.now().toMillis() + 604800000));
          for (let i = 0; i < license.amountOf; i++) {
            this.afs.collection('license_subscriptions').add(Object.assign({}, licenseSub));
          }
        }
        this.afs.collection('outgoing_emails').add(Object.assign({}, ProcessorderService.getEmailObject(user)));
        this.afs.collection('orders').add(Object.assign({}, order));
        this.afs.collection('users').doc(user.id).update({
          cart: Object.assign({}, new Cart())
        });
        return true;
      } else {
        let str = '';
        for (const i of unavailableLicenses) {
          str += i.item.title + ': Requested ' + i.amountOf + ' but only ' + i.item.quantity + ' in stock.;';
        }
        this.messageService.add(str, alerts.danger);
        return false;
      }
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

  getOrder(orderID: string): Observable<Order> {
    return this.afs.collection('orders').doc(orderID).snapshotChanges().pipe(
      map(order => {
        return {
          id: order.payload.id,
          ...order.payload.data()
        } as Order;
      })
    );
  }

  getLicenseSubscriptions(userID: string): Observable<LicenseSubscription[]> {
    return this.afs.collection('license_subscriptions', ref =>
      ref.where('userID', '==', userID)
        .where('validTo', '>=', Timestamp.now())).snapshotChanges().pipe(
      map(subs => subs.map(sub => {
        return {
          id: sub.payload.doc.id,
          ...sub.payload.doc.data()
        } as LicenseSubscription;
      }))
    );
  }

  getPlanSubscription(userID: string): Observable<PlanSubscription[]> {
    return this.afs.collection('plan_subscriptions', ref =>
      ref.where('userID', '==', userID)
        .where('validTo', '>=', Timestamp.now())).snapshotChanges().pipe(
      map(subs => subs.map(sub => {
        return {
          id: sub.payload.doc.id,
          ...sub.payload.doc.data()
        } as PlanSubscription;
      }))
    );
  }

  cancelPlan(sub: PlanSubscription) {
    console.log(sub.id);
    this.afs.collection('plan_subscriptions').doc(sub.id).delete();
  }

  cancelLicense(sub: LicenseSubscription) {
    this.afs.collection('license_subscriptions').doc(sub.id).delete();
  }
}
