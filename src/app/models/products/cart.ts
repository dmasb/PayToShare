import {Product} from "./product";
import {firestore} from "firebase";
import Timestamp = firestore.Timestamp;
import {ICartItem} from "./ICartItem";


export interface ICart {
  numberOfItems?: number;
  totalPrice?: number;
  items?: ICartItem[];
  created?: Timestamp;
}

export class Cart {

  numberOfItems?: number = 0;
  totalPrice?: number = 0;
  items?: ICartItem[] = [];
  created?: Timestamp = firestore.Timestamp.now();


  getItems() {
    return this.items;
  }

  /* Iterates the cart and adds product count instead of*/
  add(product: Product) {
    let found = false;
    // Iterate items
    for (let i of this.items) {
      // Item found
      if (i.product.id === product.id) {
        // Increase amount.
        found = true;
        i.amountOf+=1;
        this.numberOfItems +=1;
        break;
      }
    }

    if(!found) {
      this.items.push(<ICartItem>{product: product, amountOf: 1});
      this.numberOfItems +=1;
    }
  }

  remove(product: Product) {
    for (let i of this.items) {
      // Item found
      if (i.product.id === product.id) {

        if(i.amountOf < 1){
          this.items.splice(this.items.indexOf(i), 1); // deletes entry
        }
        else{
          i.amountOf-=1;
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
    for (let i of this.items) {
      sum += (i.amountOf * i.product.price);
    }
    return sum;
  }
}
