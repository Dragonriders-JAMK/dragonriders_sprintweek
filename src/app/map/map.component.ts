import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { KarttaService } from '../kartta.service';
import { Kartta } from '../kartta';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  map!: L.Map;
  searchQuery: string = '';

  karttas: Array<Kartta> = []; // opiskelijat tulevat tähän taulukkoon

  /* konstruktorissa injektoidaan (DI) KarttaService
tähän komponenttiin.*/
  constructor(private KarttaService: KarttaService) {
    this.KarttaService.getKarttas().subscribe((data) => (this.karttas = data));
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [62.2333, 25.7333], // Oletuskoordinaatit (Tampere)
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onSearchChange(): void {
    // Oletetaan, että tässä käytetään ulkoista hakupalvelua, joka palauttaa koordinaatit hakutuloksen perusteella
    // Tässä kohtaa voit päivittää kartan keskipisteen hakutuloksen perusteella
    const kartta = this.karttas.find((s) => s.name === this.searchQuery);
    if (kartta) {
      const coordinates = kartta.coordinate.split(',').map(parseFloat);
      const latLng: L.LatLngExpression = L.latLng(
        coordinates[0],
        coordinates[1]
      );
      this.map.setView(latLng, 13);
    } else {
      console.log('Kohteen koordinaatteja ei löytynyt tietokannasta.');
    }
    // Voit jatkaa lisäämällä muita ehtoja muiden kaupunkien käsittelyä varten
  }
  centerMap(kartta: Kartta, event: Event): void {
    event.preventDefault(); // Estää linkin oletusarvoisen toiminnan
    if (kartta.coordinate) {
      const coordinates = kartta.coordinate.split(',').map(parseFloat);
      if (coordinates.length >= 2) {
        const lat = coordinates[0];
        const lng = coordinates[1];
        this.map.setView([lat, lng], 13);

        // Lisää merkki ja popup valittuun kohteeseen
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(`<b>${kartta.name}</b><br>${kartta.info}`).openPopup();
      } else {
        console.error('Invalid coordinates format');
      }
    }
  }
}
