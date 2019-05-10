import {Product} from "./product";
import {firestore} from "firebase";
import Timestamp = firestore.Timestamp;


export interface ICart {
  numberOfItems?: number;
  totalPrice?: number;
  items?: Product[];
  created?: Timestamp;
}

export class Cart {

  numberOfItems?: number = 0;
  totalPrice?: number = 0;
  items?: Product[] = [];
  created?: Timestamp = firestore.Timestamp.now();


  getItems(): Product[]{
    return this.items;
  }

  add(product: Product){
    this.items.push(product);
    this.numberOfItems += 1; // Update items
    this.totalPrice = this.sum(); // update total
  }

  remove(product: Product){
    let x = this.items.indexOf(product);
    this.items.splice(x,1); // removes product from list properly by splicing
    this.numberOfItems -= 1;
  }

  emptyCart(): void {
    this.items = [];
  }

  sum(): number {
    let sum = 0;
    for (let i of this.items){
      sum += i.price;
    }
    return sum;
  }
}
