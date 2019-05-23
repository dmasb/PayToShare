import {Injectable} from '@angular/core';
import {alerts} from '../models/alerts';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  code: alerts;

  add(message: string, code: alerts) {
    this.messages = [];
    for (const row of message.split(';')) {
      if (row.length > 0) {
        this.messages.push(row);
      }
    }
    this.code = code;
  }

  clear() {
    this.messages = [];
  }
}
