import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// To access API URL
const apiUrl = environment.API_URL;

// To access API Key
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  apiUrl: string | undefined;
  apiKey: string;
  constructor(private http: HttpClient) {
    // Initialize serviceUrl and apiKey here
    this.apiUrl = environment.API_URL;
    this.apiKey = environment.API_KEY;
  }

  load(city: String) {
    return this.http.get(apiUrl + '?q=' + city + '&APPID=' + apiKey);
  }
  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + '.png';
  }
}
