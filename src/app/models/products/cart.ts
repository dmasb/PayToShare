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
    let found = false;
    let price = 0;
    if (license.salePrice > 0) {
      price = license.salePrice;
    } else {
      price = license.price;
    }
    // Iterate items
    for (const i of this.licenses) {
      // Item found
      if (i.item.id === license.id) {
        // Increase amount.
        found = true;
        this.totalPrice += price;
        i.amountOf++;
        this.numberOfItems++;
        break;
      }
    }

    if (!found) {
      this.licenses.push({item: license, amountOf: 1} as ICartItem);
      this.totalPrice += price;
      this.numberOfItems += 1;
    }
  }

  addPlan(plan: Plan) {

    if (!this.plan) {
      this.plan = new Plan();
      let thisPlansPrice = 0;
      if (this.plan.salePrice > 0) {
        thisPlansPrice = this.plan.salePrice;
      } else {
        thisPlansPrice = this.plan.price;
      }

      if (this.plan && this.plan.salePrice > 0) {
        this.totalPrice -= thisPlansPrice;
        this.numberOfItems--;
      } else if (this.plan && this.plan.salePrice === 0) {
        this.totalPrice -= this.plan.price;
        this.numberOfItems--;
      }
    }

    if (plan.salePrice > 0) {
      this.totalPrice += plan.salePrice;
    } else {
      this.totalPrice += plan.price;
    }
    this.plan = plan;
    this.numberOfItems++;
  }

  remove(license: License) {
    let price = 0;
    if (license.salePrice > 0) {
      price = license.salePrice;
    } else {
      price = license.price;
    }
    for (const i of this.licenses) {
      // Item found
      if (i.item.id === license.id) {
        if (i.amountOf <= 1) {
          this.totalPrice -= price;
          this.licenses.splice(this.licenses.indexOf(i), 1); // deletes entry
          this.numberOfItems -= 1;
        } else {
          this.totalPrice -= price;
          i.amountOf -= 1;
          this.numberOfItems -= 1;
        }
      }
    }
  }

  removePlan() {
    if (this.plan !== null) {
      if (this.plan.salePrice > 0) {
        this.totalPrice -= this.plan.salePrice;
      } else {
        this.totalPrice -= this.plan.price;
      }
      this.numberOfItems--;
      this.plan = null;
    }
  }

  removeAllOf(license: License) {
    for (const i of this.licenses) {
      if (i.item.id === license.id) {
        if (i.amountOf > 0) {
          let price = 0;
          if (license.salePrice > 0) {
            price = license.salePrice;
          } else {
            price = license.price;
          }
          this.totalPrice -= price * i.amountOf;
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
