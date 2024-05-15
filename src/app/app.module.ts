import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';
import { WeatherComponent } from './weather/weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Remove this line
// import { GeolocationModule } from '@ng-web-apis/geolocation';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtusivuComponent,
    NavbarComponent,
    MapComponent,
    AdminComponent,
    ListComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Remove this line
    // GeolocationModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
