import {Injectable, OnInit} from '@angular/core';
import {Format} from '../../models/products/format';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {alerts} from '../../models/alerts';
import {TagService} from './tag.service';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class FormatService implements OnInit {

  formats: Observable<Format[]>;
  formatIDBeingDeleted: string;

  constructor(
    private tagService: TagService,
    private afs: AngularFirestore,
    private messageService: MessageService) {
    this.formatIDBeingDeleted = null;
  }


  getFormats() {
    return this.afs.collection('formats').snapshotChanges();
  }

  addFormat(formatName: string, tagID: string) {

    this.tagService.getTagDocReference(tagID).get().then(tagDoc => {
      if (tagDoc.exists) {
        const newFormat: Format = {
          format: formatName,
          tagRef: tagDoc.ref,
          created: Timestamp.now()
        };
        this.afs.collection('formats').add(newFormat);
      } else {
        this.messageService.add('Invalid tag', alerts.danger);
      }
    });
  }

  ngOnInit(): void {
    this.formats = this.afs.doc<Format[]>('formats').valueChanges();
  }

  available(formatID: string): boolean {
    if (this.formatIDBeingDeleted === null) {
      this.formatIDBeingDeleted = formatID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.afs.doc(`formats/${this.formatIDBeingDeleted}`).delete().then(success => {
      this.messageService.add('Successfully removed', alerts.success);
    });
    this.formatIDBeingDeleted = null;
  }

  cancel() {
    this.formatIDBeingDeleted = null;
  }

  updateFormat(formatID: string, formatName: string, tagID: string) {
    this.afs.doc(`formats/${formatID}`).update({
      format: formatName,
      tagRef: this.tagService.getTagDocReference(tagID)
    }).then(() => {
      this.messageService.add('Format successfully added', alerts.success);
    }, () => {
      this.messageService.add('Submission failed', alerts.danger);
    });
  }
}
