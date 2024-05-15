import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private apiKey = 'a200848fd6mshd859f37c1eaba64p1d8c3bjsnfa822ce85126';
  private apiUrl = 'https://the-weather-api.p.rapidapi.com/api/weather/';

  constructor(private http: HttpClient) {}

  searchWeather(city: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-key', this.apiKey)
      .set('X-RapidAPI-Host', 'the-weather-api.p.rapidapi.com');

    const options = { headers };
    const url = `${this.apiUrl}${city}`; // Corrected URL construction
    return this.http.get(url, options);
  }
}
