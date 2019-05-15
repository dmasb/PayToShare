import {Product} from './product';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {ICartItem} from './ICartItem';


export interface ICart {
  numberOfItems?: number;
  totalPrice?: number;
  items?: ICartItem[];
  created?: Timestamp;
}

export class Cart {

  numberOfItems = 0;
  totalPrice = 0;
  items?: ICartItem[] = [];
  created?: Timestamp = firestore.Timestamp.now();

  constructor() {
  }

  static clone(cart: Cart): Cart {
    const tempCart = new Cart();
    tempCart.numberOfItems = cart.numberOfItems;
    tempCart.totalPrice = cart.totalPrice;
    tempCart.items = cart.items;
    tempCart.created = cart.created;
    return tempCart;
  }

  getItems() {
    return this.items;
  }

  /* Iterates the cart and adds product count instead of*/
  add(product: Product) {
    let found = false;
    // Iterate items
    for (const i of this.items) {
      // Item found
      if (i.product.id === product.id) {
        // Increase amount.
        found = true;
        this.totalPrice += i.product.price;
        i.amountOf += 1;
        this.numberOfItems += 1;
        break;
      }
    }

    if (!found) {
      this.items.push({product, amountOf: 1});
      this.totalPrice += product.price;
      this.numberOfItems += 1;
    }
  }

  remove(product: Product) {
    for (const i of this.items) {
      // Item found
      if (i.product.id === product.id) {

        if (i.amountOf < 1) {
          this.items.splice(this.items.indexOf(i), 1); // deletes entry
        } else {
          this.totalPrice -= i.product.price;
          i.amountOf -= 1;
          this.numberOfItems -= 1;
        }
      }
    }
  }

  emptyCart(): void {
    this.items = [];
  }

  sum(): number {
    let sum = 0;
    for (const i of this.items) {
      sum += (i.amountOf * i.product.price);
    }
    return sum;
  }
}
