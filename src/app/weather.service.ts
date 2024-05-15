import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

// To access API URL
const apiUrl = environment.API_URL;

// To access API Key
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  apiKey: string;
  apiUrl: string;
  constructor(private http: HttpClient) {
    // Initialize serviceUrl and apiKey here
    this.apiUrl = environment.API_URL;
    this.apiKey = environment.API_KEY;
  }
}
