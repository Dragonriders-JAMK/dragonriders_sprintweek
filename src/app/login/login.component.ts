import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {}

  login(): void {
    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.isLoggedIn = true;
      console.log('Kirjautuminen onnistui');
    } else {
      console.log('Kirjautuminen epäonnistui');
    }
  }
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
