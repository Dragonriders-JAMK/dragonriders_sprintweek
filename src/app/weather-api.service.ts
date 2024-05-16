import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private apiKey = 'ab478b17efmsh735bfb49624236fp1f6dbejsnc5003b4132b8';
  private apiUrl = 'https://the-weather-api.p.rapidapi.com/api/weather';

  constructor(private http: HttpClient) {}

  searchWeather(city: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-key', this.apiKey)
      .set('X-RapidAPI-Host', 'the-weather-api.p.rapidapi.com');

    return this.http.get(`${this.apiUrl}/${city}`, { headers });
  }

  searchWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-key', this.apiKey)
      .set('X-RapidAPI-Host', 'the-weather-api.p.rapidapi.com');

    // Assuming the API accepts latitude and longitude as query parameters
    const url = `${this.apiUrl}?lat=${latitude}&lon=${longitude}`;
    return this.http.get(url, { headers });
  }
}
