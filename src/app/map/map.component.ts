import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

//const iconRetinaUrl = 'assets/marker-icon-2x.png';
//const iconUrl = 'assets/marker-icon.png';
//const shadowUrl = 'assets/marker-shadow.png';
/*const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;*/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  map!: L.Map; // ! olettaa että map saa aina arvon
  constructor() {}

  initMap(): void {
    //ottaa nykyisen sijainnin, argumenttina saa nykyisen sijainnin

    this.map = L.map('map', {
      center: [62.2333, 25.7333],
      zoom: 13,
    });

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(this.map);
    /*navigator.geolocation.getCurrentPosition((location) => {
      const latlng = new L.LatLng(
        location.coords.latitude,
        location.coords.longitude
      );
      //otamme muuttujaan lat tämän hetkisen leveyskoordinaatin
      const lat = location.coords.latitude;

      this.map = L.map('map').setView(latlng, 13);

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(this.map);

      // show the scale bar on the lower left corner
      L.control.scale().addTo(this.map);

      // show a marker on the map
      //L.marker(latlng).bindPopup('The center of the world').addTo(this.map);
    });*/
  }
  //metodi suoritetaan heti kun view eli HTML-templaatti on latautunut
  ngAfterViewInit(): void {
    this.initMap();
  }
}
