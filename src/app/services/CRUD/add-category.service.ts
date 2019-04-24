import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})

export class AddCategoryService {
  
  röv: AngularFirestoreCollection<Category>;
  categories: Observable<any[]>;

  constructor(private afs: AngularFirestore) { 

    this.categories = this.afs.collection('categories').snapshotChanges().pipe(
      map( action => action.map(a =>{
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    )

  } 

  getCategories(){
    return this.categories;
  }

  addCategory(catTitle: Category){
    this.afs.collection('categories').add(catTitle);
  }
}
