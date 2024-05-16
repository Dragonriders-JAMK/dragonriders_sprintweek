// WeatherComponent
import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';

import { WeatherModel } from '../weatherModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
  searchForm: FormGroup;
  cityName = '';
  data = {
    temp: '',
    feelslike: '',
    pressure: '',
    humidity: '',
    city: '',
    main: '',
    imageUrl: '',
  };

  constructor(
    private readonly weatherService: WeatherService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      cityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData(this.cityName);
  }

  loadData(cityName: string) {
    // Use cityName in your function logic
    console.log('loadData called with cityName:', cityName);
    if (this.searchForm.valid && cityName) {
      console.log('Calling fetchData with cityName:', cityName);
      this.weatherService.fetchData(cityName).subscribe({
        next: (data: any) => {
          console.log('Received data:', data);
          this.data.temp = data.main.temp;
          this.data.feelslike = data.main.feels_like;
          this.data.pressure = data.main.pressure;
          this.data.humidity = data.main.humidity;
          this.data.city = data.name;
          this.data.main = data.weather[0].main;
          this.data.imageUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          // handle data
        },
        error: (error: any) => {
          console.log('Error while fetching data:', error);
        },
      });
    }
  }
}
