import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export function loginGuard(): boolean {
  //injektoidaan, koska funktiossa ei ole constructoria
  if (inject(AuthenticationService).loggedIn) {
    return true; //jos on kirjauduttu sisään eli isLoggedIn:in arvo on true,
    //päästään eteenpäin
  } else {
    inject(Router).navigate(['./login']);
    return false; //jos ei ole kirjauduttu sisään eli jos isLoggedIn:in arvo on false
    //ohjataan kirjautumissivulle
  }
}
