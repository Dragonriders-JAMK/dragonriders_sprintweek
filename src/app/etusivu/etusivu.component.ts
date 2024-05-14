import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-etusivu',
  templateUrl: './etusivu.component.html',
  styleUrls: ['./etusivu.component.css'],
})
export class EtusivuComponent {
  constructor(private router: Router) {}

  navigateToMap() {
    this.router.navigate(['/map']); // Replace 'your-route' with the actual route path
  }
  navigateToWeather() {
    this.router.navigate(['/weather']); // Replace 'your-route' with the actual route path
  }
}
