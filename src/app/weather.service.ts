// WeatherService
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WeatherModel } from './weatherModel';
import { environment } from '../environments/environment';

const url = 'https://api.openweathermap.org/data/2.5/weather?q';
const apiKey = environment.openWeatherKey;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  httpClientService: any;
  constructor(private readonly httpClient: HttpClient) {}

  fetchData(cityName: string) {
    return this.httpClientService.get(
      `${url}${cityName}&appid=${apiKey}&units=metric`
    );
  }
}

//const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.openWeatherKey}`;
