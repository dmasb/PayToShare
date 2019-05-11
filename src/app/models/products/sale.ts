import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {SaleType} from '../saleType';

export interface SaleModel {
  id?: string;
  type: SaleType;
  name: string;
  begins: Timestamp;
  ends: Timestamp;
  discount: number;
  saleObjects?: any[];
}

export class Sale implements SaleModel {
  constructor() {
  }

  id?: string;
  type: SaleType;
  name: string;
  begins: Timestamp;
  ends: Timestamp;
  discount: number;
  saleObjects?: any[];
}
