import { Component } from '@angular/core';

interface Country {
  id?: number;
  name: string;
  flag: string;
  price: number;
  quantity: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'License 1',
    flag: 'f/f3/Flag_of_Russia.svg',
    price: 17075200,
    quantity: 146989754
  },
  {
    name: 'License 2',
    flag: 'c/c3/Flag_of_France.svg',
    price: 640679,
    quantity: 64979548
  },
  {
    name: 'License 3',
    flag: 'b/ba/Flag_of_Germany.svg',
    price: 357114,
    quantity: 82114224
  },
  {
    name: 'License 4',
    flag: '5/5c/Flag_of_Portugal.svg',
    price: 92090,
    quantity: 10329506
  },
  {
    name: 'License 5',
    flag: 'c/cf/Flag_of_Canada.svg',
    price: 9976140,
    quantity: 36624199
  },
  {
    name: 'License 6',
    flag: '2/21/Flag_of_Vietnam.svg',
    price: 331212,
    quantity: 95540800
  },
  {
    name: 'License 7',
    flag: '0/05/Flag_of_Brazil.svg',
    price: 8515767,
    quantity: 209288278
  },
  {
    name: 'License 8',
    flag: 'f/fc/Flag_of_Mexico.svg',
    price: 1964375,
    quantity: 129163276
  },
  {
    name: 'License 9',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    price: 9629091,
    quantity: 324459463
  },
  {
    name: 'License 10',
    flag: '4/41/Flag_of_India.svg',
    price: 3287263,
    quantity: 1324171354
  },
  {
    name: 'License 11',
    flag: '9/9f/Flag_of_Indonesia.svg',
    price: 1910931,
    quantity: 263991379
  },
  {
    name: 'License 12',
    flag: '3/38/Flag_of_Tuvalu.svg',
    price: 26,
    quantity: 11097
  },
  {
    name: 'License 13',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    price: 9596960,
    quantity: 1409517397
  }
];

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.scss']
})
export class ProductmanagementComponent {

  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;

  get countries(): Country[] {
    return COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
