import { Component } from '@angular/core';
//import { WeatherService } from '../weather.service';
import { environment } from '../../environments/environment';
export class Weather {
  update($event: Weather) {
    throw new Error('Method not implemented.');
  }
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
    update: function ($event: Weather): void {
      throw new Error('Function not implemented.');
    },
  };
}
