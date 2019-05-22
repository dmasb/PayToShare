import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {ICartItem} from './ICartItem';
import {License} from './license';
import {Plan} from './plan';


export interface CartModel {
  numberOfItems?: number;
  totalPrice?: number;
  plan: Plan;
  licenses?: ICartItem[];
  created?: Timestamp;
}

export class Cart implements CartModel {

  numberOfItems?: number;
  totalPrice?: number;
  plan: Plan;
  licenses: ICartItem[];
  created: Timestamp;

  constructor() {
    this.licenses = [] as ICartItem[];
    this.numberOfItems = 0;
    this.totalPrice = 0;
    this.created = Timestamp.now();
    this.plan = null;
  }

  static clone(cart: Cart): Cart {
    const tempCart = new Cart();
    tempCart.numberOfItems = cart.numberOfItems;
    tempCart.totalPrice = cart.totalPrice;
    tempCart.plan = cart.plan;
    tempCart.licenses = cart.licenses;
    tempCart.created = cart.created;
    return tempCart;
  }

  /* Iterates the cart and adds product count instead of extra objects.*/
  add(license: License) {
    console.log(this);
    let found = false;
    // Iterate items
    for (const i of this.licenses) {
      // Item found
      if (i.item.id === license.id) {
        // Increase amount.
        found = true;
        this.totalPrice += license.price;
        i.amountOf++;
        this.numberOfItems++;
        break;
      }
    }

    if (!found) {
      this.licenses.push({item: license, amountOf: 1} as ICartItem);
      this.totalPrice += license.price;
      this.numberOfItems += 1;
    }
  }

  remove(license: License) {
    for (const i of this.licenses) {
      // Item found
      if (i.item.id === license.id) {
        if (i.amountOf <= 1) {
          this.totalPrice -= i.item.price;
          this.licenses.splice(this.licenses.indexOf(i), 1); // deletes entry
          this.numberOfItems -= 1;
        } else {
          this.totalPrice -= i.item.price;
          i.amountOf -= 1;
          this.numberOfItems -= 1;
        }
      }
    }
  }

  removeAllOf(license: License) {
    for (const i of this.licenses) {
      if (i.item.id === license.id) {
        if (i.amountOf > 0) {
          this.totalPrice -= i.item.price * i.amountOf;
          this.licenses.splice(this.licenses.indexOf(i), 1); // deletes entry
          this.numberOfItems -= i.amountOf;
        }
      }
    }
  }

  emptyCart(): void {
    this.licenses = [];
  }

  sum(): number {
    let sum = 0;
    for (const i of this.licenses) {
      sum += (i.amountOf * i.item.price);
    }
    return sum;
  }
}
