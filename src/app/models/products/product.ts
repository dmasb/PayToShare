
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
  imageUrl?: string = null;
}
