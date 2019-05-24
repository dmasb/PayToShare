import {Component, Input, OnInit} from '@angular/core';
import {StarService} from '../../../../services/product/star.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Rating} from '../../../../models/rating';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})

export class StarReviewComponent implements OnInit {

  @Input() private productId;
  @Input() private userId;

  private stars: Observable<any>;
  private avgRating: Observable<any>;
  private ratings: Rating[];

  constructor(private starService: StarService) {
  }


  ngOnInit() {
    this.starService.getRatings().subscribe(ratings => this.ratings = ratings);
    this.stars = this.starService.getProductStars(this.productId);
    if (this.stars) {
      console.log('Stars: ' + this.stars);
      this.avgRating = this.stars.pipe(map(arr => {
        const ratings = arr.map(v => v.value);
        return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'Not reviewed';
      }));
    }
  }



  starHandler(value) {
    this.starService.setRating(this.userId, this.productId, value);
    console.log(this.productId);
    console.log(this.userId);
  }
}
