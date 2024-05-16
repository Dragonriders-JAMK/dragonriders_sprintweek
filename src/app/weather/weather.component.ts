import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';
import { GeolocationService } from '@ng-web-apis/geolocation';

interface Weather {
  city: string;
  conditions: string;
  temperature: number;
  expected_temp: string;
  wind: string;
  humidity: string;
  icon: string;
}

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
    private weatherService: WeatherAPIService,
    private geolocation: GeolocationService
  ) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather(): void {
    this.geolocation.subscribe({
      next: (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService
          .searchWeatherByCoordinates(latitude, longitude)
          .subscribe(
            (response) => {
              console.log('API Response:', response);
              const data = response.data;
              this.weather = {
                city: data.city,
                conditions: data.current_weather,
                temperature: parseInt(data.temp, 10),
                expected_temp: data.expected_temp,
                wind: data.wind,
                humidity: data.humidity,
                icon: data.bg_image,
              };
              this.errorMessage = null;
            },
            (error) => {
              console.error('Error fetching weather data', error);
              this.errorMessage =
                'Could not fetch weather data for your location. Please try again later.';
            }
          );
      },
      error: (error) => {
        console.error('Geolocation error:', error);
        this.errorMessage =
          'Could not determine your location. Please enter a city.';
      },
    });
  }

  searchWeather(): void {
    if (this.searchForm.valid) {
      const city = this.searchForm.get('city')?.value;
      this.weatherService.searchWeather(city).subscribe(
        (response) => {
          console.log('API Response:', response);
          const data = response.data;
          this.weather = {
            city: data.city,
            conditions: data.current_weather,
            temperature: parseInt(data.temp, 10),
            expected_temp: data.expected_temp,
            wind: data.wind,
            humidity: data.humidity,
            icon: data.bg_image,
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
