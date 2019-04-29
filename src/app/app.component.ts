import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './_layout.html',
  styleUrls: ['./_layout.scss']
})
export class AppComponent {
  title = 'gNine';
  faCoffee = faCoffee;
}
