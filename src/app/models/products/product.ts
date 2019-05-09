export interface ProductModel {
  id?: string;
  title?: string;
  tagIDs?: string[];
  formatID: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
}

export class Product implements ProductModel {
  constructor() {
  }

  id?: string;
  title?: string;
  tagIDs?: string[];
  formatID: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com' +
    '/o/productImage%2Fgd.png?alt=media&token=b2ddece0-7aa1-43c8-8a83-e0e2930d5b7d';
}
