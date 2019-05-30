import {Component, OnInit} from '@angular/core';
import {LicenseService} from '../../../services/product/license.service';
import {License} from '../../../models/products/license';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';
import {StarService} from '../../../services/product/star.service';
import {Rating} from '../../../models/rating';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {

  private licenses: License[];
  private cart: Cart;
<<<<<<< HEAD

  constructor(private licenseService: LicenseService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.userSessionService.getUserDoc().subscribe(user => {
      if (user) {
        this.cart = Cart.clone(user.cart);
      }
=======
  private userId: string;
  private licId: any;
  private ratings: Rating[];


  constructor(private licenseService: LicenseService,
              private userSessionService: UserSessionService,
              private starService: StarService,) { }

  ngOnInit() {
    this.cart = new Cart();
    this.starService.getRatings().subscribe(ratings => this.ratings = ratings);
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.userSessionService.getUserDoc().subscribe(user => {
      this.userId = user.id;
      this.cart = Cart.clone(user.cart);
>>>>>>> ab3166ca227ccc659cc851df9361993778fb268a
    });
  }

  add(license: License) {
    this.cart.add(license);
    this.userSessionService.updateCart(this.cart);
  }

  consLog(licenseId) {
    this.licId = licenseId;
  }

  get licenseId() {
    return this.licId;
  }

  getObjectRating(objectID: string): number {
    if (this.ratings) {
      const objectRatings = this.ratings.filter(res => res.objectID === objectID);
      const numberArray = objectRatings.map(r => r.value);
      return numberArray.length ? numberArray.reduce((total, val) => total + val) / numberArray.length : 0;
    }
  }
  sort() {
    const selectedOption = (document.getElementById('sortSales') as HTMLSelectElement);

    switch (selectedOption.value) {
      case 'Ascending': {
        console.log('asc');
        this.licenses.sort((a, b) => (this.getObjectRating(a.id) > this.getObjectRating(b.id) ? -1 : 1));
        break;
      }
      case 'Descending': {
        console.log('Desc');
        this.licenses.sort((a, b) => (this.getObjectRating(a.id) < this.getObjectRating(b.id) ? -1 : 1));
        break;
      }
    }
  }
}
