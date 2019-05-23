import {Item} from './item';
import {Level} from './planLevels';
import {License} from './license';

export class Plan implements Item {
  id?: string;
  title: string;
  speed: number;
  level: Level;
  price: number;
  salePrice: number;
  defaultLicenses: string[];
  licenses: License[];
  description: string;
  imageUrl: string;
  created: firebase.firestore.Timestamp;

  constructor() {
    this.title = 'Plan name';
    this.speed = 0;
    this.level = new Level();
    this.price = 0;
    this.salePrice = 0;
    this.description = 'Plan Description';
    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/' +
      'productImage%2Fitemimg.svg?alt=media&token=130ed9f0-6e1a-4d93-abf3-62d77de18599';
  }
}
