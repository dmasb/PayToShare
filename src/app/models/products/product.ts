import {Tag} from './tag';

export interface Product {
  id?: string;
  title?: string;
  tags?: Tag[];
  format: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: {
    downloadURL: string,
    path: string
  }
}

