import {Component, Input, OnInit} from '@angular/core';
import { StarService } from "../../../../services/product/star.service";
import { Observable } from "rxjs";
import { from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() productId;
  @Input() userId;

  stars: Observable<any>;
  avgRating: Observable<any>;


  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getProductStars(this.productId);

    // Should be this.stars.map(>>>>>   I added pipe(map(>>> instead for the meanwhile.
    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'Not reviewed'
    }))
  }

  starHandler(value) {
    this.starService.setStar(this.userId, this.productId, value)
  }

}
