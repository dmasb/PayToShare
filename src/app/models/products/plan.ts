import {License} from './license';

export interface PlanModel {
  id?: string;
  title?: string;
  speed: number;
  price?: number;
  quantity: number;
  salesID?: string;
  licenseIDs: string[];
  description?: string;
  imageUrl?: string;
}

export class Plan implements PlanModel {
  constructor() {
  }

  id?: string;
  title = 'Plan name';
  speed = 500;
  price = 199;
  quantity = 0;
  salesID = 'none';
  licenseIDs: string[];
  description = 'Plan description';
  imageUrl = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/' +
    'productImage%2Fitemimg.svg?alt=media&token=130ed9f0-6e1a-4d93-abf3-62d77de18599';
}
