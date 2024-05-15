import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';

interface Weather {
  city: string;
  conditions: string;
  temperature: number;
  icon: string;
  expected_temp: number;
  humidity: number;
  wind: number;
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
        (data) => {
          this.weather = {
            city: data.city,
            conditions: data.conditions,
            temperature: data.temperature,
            icon: data.icon,
            expected_temp: data.expected_temp,
            humidity: data.humidity,
            wind: data.wind,
          };
        },
        (error) => {
          console.error('Error fetching weather data', error);
        }
      );
    }
  }
}
