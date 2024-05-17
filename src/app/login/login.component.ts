import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login(): void {
    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.loggedIn = true;
      this.router.navigate(['/etusivu']);
    } else {
      console.log('Kirjautuminen epäonnistui');
    }
  }
  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }
}
