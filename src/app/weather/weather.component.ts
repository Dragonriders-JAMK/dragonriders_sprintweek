// WeatherComponent
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather-service.service';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { WeatherModel } from '../weatherModel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  searchForm!: FormGroup;
  weather: WeatherModel | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
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
              this.weather = response;
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
          this.weather = response;
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
