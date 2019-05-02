import {License} from './license';

export interface Plan {
  id?: string;
  title?: string;
  speed: number;
  price?: number;
  licenses: License[];
  description?: string;
  imageUrl?: string;
}
