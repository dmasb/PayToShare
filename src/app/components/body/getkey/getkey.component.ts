import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore, DocumentData} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Email, IEmail} from "../../../models/email";

@Component({
  selector: 'app-getkey',
  templateUrl: './getkey.component.html',
  styleUrls: ['./getkey.component.scss']
})
export class GetkeyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
  }

  activationKey: string = 'INVALID';
  externalHash;
  internalHash;
  queryResult: IEmail;

  ngOnInit() {
    this.getInternalHash().then(() => console.log('Internal OK'));
    this.getExternalHash().then( () => console.log('External OK'));
  }

  async validateHash (){
    if(this.internalHash === this.externalHash){
      this.activationKey = this.queryResult.activationKey;
    }
  }
  async getInternalHash(){
    this.route.params.subscribe((result) => {
      if (result) {
        this.externalHash = result['hash'];
      }
    });
  }

  async getExternalHash(){
    if(this.externalHash){
      let doc = await this.afs.collection('outgoing_emails').ref.where('hash', '==', this.externalHash.toString());
      await doc.get().then((data) => {
        if (data.empty) {
          console.log('Could not find hash in db.');
        } else {
          data.forEach((doc) => {
            console.log('Size of data: ' + data.size);
            this.queryResult = doc.data() as IEmail;
            this.internalHash = this.queryResult.hash;
          });
        }
      });
    }

    else {
      console.log('External hash not yet defined.');
    }
    console.log('External hash: ' + this.externalHash);
    console.log('Internal hash: ' + this.internalHash);
  }

  reveal() {
    this.validateHash().then( () => {
      this.activationKey = this.queryResult.activationKey;
    });
    let doc = document.getElementById('btn') as HTMLInputElement;
    doc.innerHTML = this.activationKey;
  }


}
