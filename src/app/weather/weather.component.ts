import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  searchForm: FormGroup;
  weather: Weather | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherAPIService
  ) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  searchWeather(): void {
    if (this.searchForm.valid) {
      const city = this.searchForm.get('city')?.value;
      this.weatherService.searchWeather(city).subscribe(
        (response) => {
          console.log('API Response:', response); // Log the response to inspect it
          const data = response.data; // Access the data property
          this.weather = {
            city: data.city,
            conditions: data.current_weather,
            temperature: parseInt(data.temp, 10),
            expected_temp: data.expected_temp,
            wind: data.wind,
            humidity: data.humidity,
            icon: data.bg_image, // Assuming you want to use the bg_image as the icon
          };
          this.errorMessage = null;
        },
        (error) => {
          console.error('Error fetching weather data', error);
          this.errorMessage =
            'Could not fetch weather data. Please try again later.';
        }
      );
    }
  }
}
