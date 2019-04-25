import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFirestoreDocument} from "@angular/fire/firestore";
import { Observable} from "rxjs";
import {Item} from "../../models/Item";
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    //this.items = this.afs.collection('items').valueChanges();

    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title','asc')); // Orders by title, ascending.

    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }
}


