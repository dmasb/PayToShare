import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {Md5} from "ts-md5";

export interface IEmail {
  activationKey: string;
  created: Timestamp;
  emailsubject: string;
  message: string;
  orderid: string;
  recipient: string;
  hash;
}

export class Email implements IEmail {

  activationKey: string;
  created: firebase.firestore.Timestamp;
  emailsubject: string;
  message: string;
  orderid: string;
  recipient: string;
  hash;

  constructor() {
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  generateHash (toHash: string){
    return Md5.hashAsciiStr(toHash);
  }

  isValidHash(internal: string, external:string): boolean{
    return (internal === external);
  }

  generateKey() {
    let tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      chars = 5,
      segments = 4,
      keyString = '';
    for (let i = 0; i < segments; i++) {
      let segment = '';

      for (let j = 0; j < chars; j++) {
        let k = this.getRandomInt(0, 35);
        segment += tokens[k];
      }

      keyString += segment;

      if (i < (segments - 1)) {
        keyString += '-';
      }
    }
    return keyString;
  }


}





