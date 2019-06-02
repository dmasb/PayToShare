import {Component, OnInit} from '@angular/core';
import {Sale} from '../../../models/products/sale';
import {PlanService} from '../../../services/product/plan.service';
import {SalesService} from '../../../services/product/sales.service';
import {SaleType} from '../../../models/saleType';
import {Plan} from '../../../models/products/plan';
import {License} from '../../../models/products/license';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {User} from '../../../models/user';
import {Rating} from '../../../models/rating';
import {StarService} from '../../../services/product/star.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  private licenseSale: Sale[];
  private planSale: Sale[];
  private cart: Cart;
  private user: User;
  private userId: string;
  private licId: any;
  private ratings: Rating[];

  constructor(private planService: PlanService,
              private salesService: SalesService,
              private userSessionService: UserSessionService,
              private starService: StarService,
              private router: Router) {
  }

  ngOnInit() {
    this.starService.getRatings().subscribe(ratings => this.ratings = ratings);
    this.salesService.getSaleOnType(SaleType.LICENSE).subscribe(sales => this.licenseSale = sales);
    this.salesService.getSaleOnType(SaleType.PLAN).subscribe(sales => this.planSale = sales);
    this.userSessionService.getUserDoc().subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.user = user;
        this.cart = Cart.clone(user.cart);
      }
    });
  }

  unpackLicenses(licenses: any[]): License[] {
    return licenses as License[];
  }

  unpackPlans(plans: any[]): Plan[] {
    const temp = plans as Plan[];
    return temp.sort((a, b) => (a.speed < b.speed) ? -1 : 1);
  }

  addLicense(license: License) {
    if (!this.cart) {
      this.router.navigate(['/register']);
    } else {
      this.cart.add(license);
      this.userSessionService.updateCart(this.cart);
      const x = document.getElementById('myDiv');
      x.style.display = 'block';
      setTimeout(() => {
        x.style.display = 'none';
        console.log('tick');
      }, 1000);
    }
  }

  addPlan(plan: Plan) {
    if (!this.cart) {
      this.router.navigate(['/register']);
    } else {
      this.cart.addPlan(plan);
      this.userSessionService.updateCart(this.cart);
      const x = document.getElementById('myDiv');
      x.style.display = 'block';
      setTimeout(() => {
        x.style.display = 'none';
        console.log('tick');
      }, 1000);
    }
  }

  getDaysLeft(end: Timestamp): string {
    let secondsLeft = end.seconds - Timestamp.now().seconds;
    const days = Math.floor(secondsLeft / 86400);
    secondsLeft %= 86400;
    const hours = Math.floor(secondsLeft / 3600);
    return days + ' days ' + hours + ' hours left!';
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
}

