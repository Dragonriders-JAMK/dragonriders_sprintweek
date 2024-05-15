import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherDataService } from '../weatherData.service';
import { Weather } from '../weather/weather.component';

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
    this.weatherData.load(this.city).subscribe((data: Weather) => {
      this.weather.city = data.name;
      this.weather.conditions = data.weather.main;
      this.weather.temperature = Math.round(
        (data.main.temp - 273.15) * 1.8 + 32
      );
      this.weather.icon = this.weatherData.getIconUrl(data.weather.icon);

      this.onSelection.emit(this.weather);
    });
  }
}
