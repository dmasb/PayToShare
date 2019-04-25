import {Injectable, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../../models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService implements OnInit {
  categories: Observable<Category[]>;
  categoryBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.categoryBeingDeleted = null;
  }

  getCategories() {
    return this.afs.collection('categories').snapshotChanges();

  }

  addCategory(category: Category) {
    this.afs.collection('categories').add(category);
  }

  available(categoryId: string): boolean {
    if (this.categoryBeingDeleted === null) {
      this.categoryBeingDeleted = categoryId;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`categories/${this.categoryBeingDeleted}`).delete();
    this.categoryBeingDeleted = null;
  }

  cancel() {
    this.categoryBeingDeleted = null;
  }

  ngOnInit(): void {
    // this.categories = this.afs.collection('categories').valueChanges();
  }

  updateCategory(category: Category) {
    this.afs.doc(`categories/${category.id}`).update(category);
  }
}
