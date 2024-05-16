// WeatherService
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherModel } from './weatherModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  searchWeather(city: string): Observable<WeatherModel> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.openWeatherKey}`;
    return this.httpClient
      .get<any>(url)
      .pipe(map((res) => res.weather[0] as WeatherModel));
  }
}
