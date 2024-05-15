import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  searchForm!: FormGroup;
  weather: any;

  constructor(private fb: FormBuilder, private service: WeatherAPIService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: [null, Validators.required],
    });
  }

  searchWeather() {
    console.log('HALOO');
    console.log(this.searchForm.value);
    this.service
      .searchWeather(this.searchForm.get(['city'])!.value)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
