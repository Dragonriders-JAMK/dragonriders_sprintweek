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
<<<<<<< HEAD
    this.weatherData.load(this.city).subscribe((data: Weather) => {
      this.weather.city = data.name;
      this.weather.conditions = data.weather.main;
      this.weather.temperature = Math.round(
        (data.main.temp - 273.15) * 1.8 + 32
      );
      this.weather.icon = this.weatherData.getIconUrl(data.weather.icon);
=======
    this.weatherData.load(this.city).subscribe((data) => {
      this.weather.city = data['name'];
      this.weather.conditions = data['weather'][0]['main'];
      this.weather.temperature = Math.round(
        ((data['main']['temp'] - 273.15) * 9) / 5 + 32
      );
      this.weather.icon = this.weatherData.getIconUrl(
        data['weather'][0]['icon']
      );
>>>>>>> c5891038512c731dbefc28e54b3925f9a35e053d

      this.onSelection.emit(this.weather);
    });
  }
}
