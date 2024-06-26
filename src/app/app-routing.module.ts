import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtusivuComponent } from './etusivu/etusivu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { WeatherComponent } from './weather/weather.component';
import { AdminComponent } from './admin/admin.component';
import { loginGuard } from './login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'etusivu', component: EtusivuComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'admin', component: AdminComponent, canActivate: [loginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
