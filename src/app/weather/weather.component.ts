import { Component } from '@angular/core';
import { Weather } from '../weather';
//import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {
  weather: Weather = {
    city: 'Jyväskylä',
    conditions: 'Sunny',
    temperature: 20,
    icon: '',
  };
}
