import {Tag} from './tag';
import * as url from 'url';
import {Format} from './format';

export interface Product {
  id?: string;
  title?: string;
  tags?: Tag[];
  format: Format;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: url;
}

