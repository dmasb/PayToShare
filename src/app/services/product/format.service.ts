import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Format} from '../../models/products/format';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {map} from 'rxjs/operators';
import {Tag} from '../../models/products/tag';

@Injectable({
  providedIn: 'root'
})
export class FormatService implements OnInit {

  formats: Observable<Format[] | undefined>;
  formatBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.formatBeingDeleted = null;
  }

  getFormatDocReference(formatID: string): DocumentReference {
    return this.afs.doc(`formats/${formatID}`).ref;
  }

  getFormats() {
    return this.afs.collection('formats').snapshotChanges();
  }

  addTag(formatName: string) {

    const format: Format = {
      name: formatName,
      created: Timestamp.now()
    };

    this.afs.collection('formats').add(format);
  }

  ngOnInit(): void {
    this.formats = this.afs.doc<Format[]>('formats').valueChanges();
  }

  available(formatID: string): boolean {
    if (this.formatBeingDeleted === null) {
      this.formatBeingDeleted = formatID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`formats/${this.formatBeingDeleted}`).delete();
    this.formatBeingDeleted = null;
  }

  cancel() {
    this.formatBeingDeleted = null;
  }

  updateFormat(formatID: string, formatName: string) {
    this.afs.doc(`formats/${formatID}`).update({
      name: formatName
    });
  }
}

