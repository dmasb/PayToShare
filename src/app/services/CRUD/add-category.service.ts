import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})

export class AddCategoryService {
  categories: Observable<any[]>;
  catDoc: AngularFirestoreDocument<any[]>;

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

  deleteCategory(catTitle: Category){
    this.catDoc = this.afs.doc(`categories/${catTitle.id}`);
    this.catDoc.delete();
  }

  updateCategory(catTitle: Category){
    this.catDoc = this.afs.doc(`categories/${catTitle.id}`)
    this.catDoc.update(catTitle);
  }
}
