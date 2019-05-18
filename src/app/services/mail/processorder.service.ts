import { Injectable } from '@angular/core';
import {Email, IEmail} from "../../models/email";
import {AuthService} from "../authentication/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import Timestamp = firestore.Timestamp;
import {firestore} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ProcessorderService {

  email: Email = new Email();
  uid: string;

  constructor(private afAuth: AuthService, private afs: AngularFirestore) { }


 async processOrder(){

    let success = false;

    /// MOCK OBJECT ////

    this.email.recipient = "lulleh_@hotmail.com";
    this.email.activationKey = this.email.generateKey();
    this.email.emailsubject = "Your order #";
    this.email.created = Timestamp.now();
    this.email.message = "test ";
    this.email.orderid = "12345";

    /////

    this.afAuth.getCurrentUser().subscribe( (user) => {
      this.email.recipient = user.email
      this.uid = user.id;
    });


    /*Makes sure email is not empty before we send it.*/
    if(this.email.recipient != null && this.email.recipient != "" && this.uid != null){
      await this.afs.collection('outgoing_emails').add(Object.assign({}, <IEmail>this.email));
      success = true;
    }

    return success
  }
}
