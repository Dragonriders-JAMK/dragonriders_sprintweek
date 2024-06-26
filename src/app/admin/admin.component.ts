import { Component, OnInit } from '@angular/core';
import { KarttaService } from '../kartta.service';
import { Kartta } from '../kartta';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
// komponentin luokkaosa joka sisältää ts-sovelluslogiikan
export class AdminComponent implements OnInit {
  karttas: Array<Kartta> = []; // taulukko johon opiskelijat tulevat servicestä
  addnew = true;
  saveedited = false;
  koordinaatit = '';
  nimi = '';
  info = '';
  id = '';

  /* konstruktorissa injektoidaan (DI) provider ContactService
     tähän komponenttiin.*/
  constructor(
    private KarttaService: KarttaService,
    private authService: AuthenticationService
  ) {}

  getKarttas() {
    // haetaan opiskelijat servicen avulla tilaamalla observable
    this.KarttaService.getKarttas().subscribe((data) => (this.karttas = data));
  }
  // lähetetään uusi opiskelija tai muokattu opiskelija
  onSubmit(formData: any) {
    console.log(formData);
    // tässä pitää valita onko kyseessä uuden lisäys vai muokkaus
    // servicessä on eri metodit postille ja putille

    // lisätään opiskelija ja laitetaan se heti listaan
    if (this.authService.isLoggedIn()) {
      if (this.addnew === true) {
        this.KarttaService.addKartta({
          coordinate: formData.koordinaatit,
          name: formData.nimi,
          info: formData.info,
        }).subscribe((data) => this.karttas.push(data));
      }
      // muokataan opiskelijaa ja haetaan heti uusi lista
      if (this.saveedited === true) {
        this.KarttaService.updateKartta({
          _id: formData.id,
          coordinate: formData.koordinaatit,
          name: formData.nimi,
          info: formData.info,
        }).subscribe(() => this.getKarttas());
        // this.getStudents();
        // nollataan asetukset
        this.addnew = true;
        this.saveedited = false;
        this.koordinaatit = '';
        this.nimi = '';
        this.info = '';
        this.id = '';
      }
    } else {
      console.log('Et ole kirjautunut sisään');
    }
  }
  // deletoidaan opiskelija ja haetaan ja pushataan uusi lista
  delete(s: Kartta) {
    if (this.authService.isLoggedIn()) {
      console.log('Poistetaan: ' + s._id);
      this.KarttaService.delKartta(s._id).subscribe(() => this.getKarttas());
    } else {
      console.log('Et ole kirjautunut sisään');
    }
  }
  // lomakkeen update -metodi joka asettaa
  // lomekkeelle arvot joita voidaan muokata
  update(s: Kartta) {
    if (this.authService.isLoggedIn()) {
      this.id = s._id; // _id pitää kuljettaa mukana vaikka sitä ei muokata
      this.koordinaatit = s.coordinate;
      this.nimi = s.name;
      this.info = s.info;

      this.addnew = false;
      this.saveedited = true;
    } else {
      console.log('Et ole kirjautunut sisään');
    }
  }

  ngOnInit() {
    this.getKarttas();
  }
}
