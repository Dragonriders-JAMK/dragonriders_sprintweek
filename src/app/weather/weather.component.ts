import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
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
