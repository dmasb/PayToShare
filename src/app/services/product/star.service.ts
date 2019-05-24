import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Rating} from '../../models/rating';

export interface Star {
  userId: any;
  productId: any;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private afs: AngularFirestore) {
  }

  // Star reviews that belong to the user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }

  // Get all stars that belong to a Product
  getProductStars(productId: string) {
    if (productId) {
      const starsRef = this.afs.collection('stars', ref => ref.where('productId', '==', productId));
      return starsRef.valueChanges();
    }
  }

  // Create or update star
  setStar(userId, productId, value) {
    // Star document data
    const star: Star = {userId, productId, value};

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.productId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star);
  }


  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5

  setRating(userID: string, objectID: string, value: number) {
    this.afs.collection('stars').ref
      .where('userID', '==', userID)
      .where('objectID', '==', objectID).get().then(res => {
      const rating = new Rating(userID, objectID, value);
      if (res.empty) {
        this.afs.collection('stars').add(Object.assign({}, rating));
      } else {
        res.docs.map(doc => {
          doc.ref.update({
            value: rating.value
          });
        });
      }
    });
  }

  getRatings(): Observable<Rating[]> {
    return this.afs.collection('stars').snapshotChanges().pipe(
      map(stars => stars.map(star => {
        return {
          id: star.payload.doc.id,
          ...star.payload.doc.data()
        } as Rating;
      }))
    );
  }

}
