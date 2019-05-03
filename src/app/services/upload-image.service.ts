import {Injectable} from '@angular/core';
import {finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private task: AngularFireUploadTask;
  private percentage: Observable<number>;
  private snapshot: Observable<UploadTaskSnapshot>;
  private downloadURL;


  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) {
  }

  startUpload(file: File, location: string) {
    // The storage path
    const path = `${location}/${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.afs.collection('files').add({downloadURL: this.downloadURL, path});
      }),
    );
  }

  getTask(): AngularFireUploadTask {
    return this.task;
  }

  getSnapshot(): Observable<UploadTaskSnapshot> {
    return this.snapshot;
  }

  getPercentage(): Observable<number> {
    return this.percentage;
  }

  isActive(snapshot: UploadTaskSnapshot): boolean {
    return snapshot.state === 'running';
  }

  getImageUrl(): url {
    return this.downloadURL as url;
  }
}
