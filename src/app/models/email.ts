import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface IEmail {
  activationKey: string;
  created: Timestamp;
  emailsubject: string;
  message: string;
  orderid: string;
  recipient: string;
}

export class Email implements IEmail {

  activationKey: string;
  created: firebase.firestore.Timestamp;
  emailsubject: string;
  message: string;
  orderid: string;
  recipient: string;

  constructor() {
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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





