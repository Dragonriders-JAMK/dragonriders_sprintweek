import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(public AuthenticationService: AuthenticationService) {}

  ngOnInit(): void {}
  //kirjautuessa ulos isLoggedIn muuttujan arvoksi vaihdetaan false
  logOut() {
    this.AuthenticationService.loggedIn = false;
  }
}
