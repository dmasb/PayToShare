import {Injectable} from '@angular/core';
import {alerts} from '../models/alerts';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  code: alerts;

  add(message: string, code: alerts) {
    this.messages.push(message);
    this.code = code;
  }

  clear() {
    this.messages = [];
  }
}
