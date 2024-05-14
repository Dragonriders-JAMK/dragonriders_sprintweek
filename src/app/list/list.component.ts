import { Component, OnInit } from '@angular/core';
import { KarttaService } from '../kartta.service';
import { Kartta } from '../kartta';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  karttas: Array<Kartta> = []; // opiskelijat tulevat tähän taulukkoon

  /* konstruktorissa injektoidaan (DI) KarttaService
tähän komponenttiin.*/
  constructor(private KarttaService: KarttaService) {
    this.KarttaService.getKarttas().subscribe((data) => (this.karttas = data));
  }
}
