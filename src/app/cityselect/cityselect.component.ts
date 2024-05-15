import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherDataService } from '../weatherData.service';
import { Weather } from '../weather/weather.component';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-cityselect',
  templateUrl: './cityselect.component.html',
  styleUrl: './cityselect.component.css',
})
export class CityselectComponent {
  @Output() onSelection: EventEmitter<Weather> = new EventEmitter<Weather>();
  weather: Weather = new Weather();
  city: String = '';

  constructor(private weatherData: WeatherDataService) {}

  submit() {
    throw new Error('Method not implemented.');
  }
}
