import {Tag} from './tag';
import * as url from 'url';

export interface Product {
  id?: string;
  title?: string;
  tags?: Tag[];
  format: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: url;
}

