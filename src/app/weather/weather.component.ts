import { Component } from '@angular/core';
//import { WeatherService } from '../weather.service';
import { environment } from '../../environments/environment';
export class Weather {
  city: string = '';
  conditions: string = '';
  temperature: number = 0;
  icon: string = '';
}

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
